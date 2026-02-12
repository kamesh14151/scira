'use client';

import { useState, useMemo } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { getUserMessageCount, getExtremeSearchUsageCount, getHistoricalUsage } from '@/app/actions';
import { SEARCH_LIMITS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowClockwiseIcon, MagnifyingGlassIcon, LightningIcon } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  ContributionGraph,
  ContributionGraphCalendar,
  ContributionGraphBlock,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from '@/components/ui/kibo-ui/contribution-graph';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UserActivityStatsProps {
  userId: string;
  userEmail: string;
}

export function UserActivityStats({ userId, userEmail }: UserActivityStatsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const monthsWindow = isMobile ? 6 : 12;

  // Create a user object for the queries
  const user = useMemo(() => ({ id: userId, email: userEmail }), [userId, userEmail]);

  const {
    data: usageData,
    isLoading: usageLoading,
    refetch: refetchUsageData,
  } = useQuery({
    queryKey: ['adminUserUsage', userId],
    queryFn: async () => {
      const [searchCount, extremeSearchCount] = await Promise.all([
        getUserMessageCount(user),
        getExtremeSearchUsageCount(user),
      ]);

      return {
        searchCount,
        extremeSearchCount,
      };
    },
    staleTime: 1000 * 60 * 3,
  });

  const {
    data: historicalUsageData,
    isLoading: historicalLoading,
    refetch: refetchHistoricalData,
  } = useQuery({
    queryKey: ['adminUserHistoricalUsage', userId, monthsWindow],
    queryFn: () => getHistoricalUsage(user, monthsWindow * 30),
    staleTime: 1000 * 60 * 10,
  });

  const searchCount = usageData?.searchCount;
  const extremeSearchCount = usageData?.extremeSearchCount;

  // Generate loading stars data
  const loadingStars = useMemo(() => {
    if (!historicalLoading) return [];

    const months = monthsWindow;
    const totalDays = months * 30;
    const futureDays = Math.min(15, Math.floor(totalDays * 0.08));
    const pastDays = totalDays - futureDays - 1;

    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + futureDays);

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - pastDays);

    const completeData: Activity[] = [];
    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateKey = currentDate.toISOString().split('T')[0];

      const shouldLight = Math.random() > 0.85;
      const count = shouldLight ? Math.floor(Math.random() * 10) + 1 : 0;

      let level: 0 | 1 | 2 | 3 | 4;
      if (count === 0) level = 0;
      else if (count <= 3) level = 1;
      else if (count <= 7) level = 2;
      else if (count <= 12) level = 3;
      else level = 4;

      completeData.push({
        date: dateKey,
        count,
        level,
      });
    }

    return completeData;
  }, [historicalLoading, monthsWindow]);

  const handleRefreshUsage = async () => {
    try {
      setIsRefreshing(true);
      await Promise.all([refetchUsageData(), refetchHistoricalData()]);
      toast.success('Usage data refreshed');
    } catch (error) {
      toast.error('Failed to refresh usage data');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Usage Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Current Usage</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefreshUsage}
            disabled={isRefreshing}
            className="h-8 px-2"
          >
            {isRefreshing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ArrowClockwiseIcon className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Today's Searches</span>
              <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            {usageLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{searchCount?.count || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              of {SEARCH_LIMITS.DAILY_SEARCH_LIMIT} daily limit
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Extreme Searches</span>
              <LightningIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            {usageLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{extremeSearchCount?.count || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              of {SEARCH_LIMITS.EXTREME_SEARCH_LIMIT} monthly limit
            </p>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground">
          Activity Heatmap (Past {monthsWindow} Months)
        </h4>
        <div className="bg-muted/50 dark:bg-card rounded-lg p-4">
          {historicalLoading ? (
            <TooltipProvider>
              <ContributionGraph
                data={loadingStars}
                blockSize={isMobile ? 10 : 12}
                blockMargin={isMobile ? 3 : 4}
                fontSize={isMobile ? 9 : 12}
                labels={{
                  totalCount: 'Loading activity data...',
                  legend: {
                    less: 'Less',
                    more: 'More',
                  },
                }}
                className="w-full opacity-60"
              >
                <ContributionGraphCalendar
                  hideMonthLabels={false}
                  className={cn('text-muted-foreground', isMobile ? 'text-[9px]' : 'text-xs')}
                >
                  {({ activity, dayIndex, weekIndex }) => (
                    <ContributionGraphBlock
                      key={`${weekIndex}-${dayIndex}-loading`}
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                      className={cn(
                        'data-[level="0"]:fill-muted/40',
                        'data-[level="1"]:fill-primary/30',
                        'data-[level="2"]:fill-primary/50',
                        'data-[level="3"]:fill-primary/70',
                        'data-[level="4"]:fill-primary/90',
                        activity.level > 0 && 'animate-pulse',
                      )}
                    />
                  )}
                </ContributionGraphCalendar>
                <ContributionGraphFooter
                  className={cn('pt-2 flex-col sm:flex-row', isMobile ? 'gap-1.5 items-start' : 'gap-2 items-center')}
                >
                  <ContributionGraphTotalCount
                    className={cn('text-muted-foreground', isMobile ? 'text-[9px] mb-1' : 'text-xs')}
                  />
                  <ContributionGraphLegend className={cn('text-muted-foreground', isMobile ? 'flex-shrink-0' : '')}>
                    {({ level }) => (
                      <svg height={isMobile ? 10 : 12} width={isMobile ? 10 : 12}>
                        <rect
                          className={cn(
                            'stroke-[1px] stroke-border/50',
                            'data-[level="0"]:fill-muted/40',
                            'data-[level="1"]:fill-primary/30',
                            'data-[level="2"]:fill-primary/50',
                            'data-[level="3"]:fill-primary/70',
                            'data-[level="4"]:fill-primary/90',
                          )}
                          data-level={level}
                          height={isMobile ? 10 : 12}
                          rx={2}
                          ry={2}
                          width={isMobile ? 10 : 12}
                        />
                      </svg>
                    )}
                  </ContributionGraphLegend>
                </ContributionGraphFooter>
              </ContributionGraph>
            </TooltipProvider>
          ) : historicalUsageData && historicalUsageData.length > 0 ? (
            <TooltipProvider>
              <ContributionGraph
                data={historicalUsageData}
                blockSize={isMobile ? 10 : 12}
                blockMargin={isMobile ? 3 : 4}
                fontSize={isMobile ? 9 : 12}
                labels={{
                  totalCount: '{{count}} total messages in {{year}}',
                  legend: {
                    less: 'Less',
                    more: 'More',
                  },
                }}
                className="w-full"
              >
                <ContributionGraphCalendar
                  hideMonthLabels={false}
                  className={cn('text-muted-foreground', isMobile ? 'text-[9px]' : 'text-xs')}
                >
                  {({ activity, dayIndex, weekIndex }) => (
                    <Tooltip key={`${weekIndex}-${dayIndex}`}>
                      <TooltipTrigger asChild>
                        <g className="cursor-help">
                          <ContributionGraphBlock
                            activity={activity}
                            dayIndex={dayIndex}
                            weekIndex={weekIndex}
                            className={cn(
                              'data-[level="0"]:fill-muted',
                              'data-[level="1"]:fill-primary/20',
                              'data-[level="2"]:fill-primary/40',
                              'data-[level="3"]:fill-primary/60',
                              'data-[level="4"]:fill-primary',
                            )}
                          />
                        </g>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <p className="font-medium">
                            {activity.count} {activity.count === 1 ? 'message' : 'messages'}
                          </p>
                          <p className="text-xs text-muted">
                            {new Date(activity.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </ContributionGraphCalendar>
                <ContributionGraphFooter
                  className={cn('pt-2 flex-col sm:flex-row', isMobile ? 'gap-1.5 items-start' : 'gap-2 items-center')}
                >
                  <ContributionGraphTotalCount
                    className={cn('text-muted-foreground', isMobile ? 'text-[9px] mb-1' : 'text-xs')}
                  />
                  <ContributionGraphLegend className={cn('text-muted-foreground', isMobile ? 'flex-shrink-0' : '')}>
                    {({ level }) => {
                      const getTooltipText = (level: number) => {
                        switch (level) {
                          case 0:
                            return 'No messages';
                          case 1:
                            return '1-3 messages';
                          case 2:
                            return '4-7 messages';
                          case 3:
                            return '8-12 messages';
                          case 4:
                            return '13+ messages';
                          default:
                            return `${level} messages`;
                        }
                      };

                      return (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <svg height={isMobile ? 10 : 12} width={isMobile ? 10 : 12} className="cursor-help">
                              <rect
                                className={cn(
                                  'stroke-[1px] stroke-border/50',
                                  'data-[level="0"]:fill-muted',
                                  'data-[level="1"]:fill-primary/20',
                                  'data-[level="2"]:fill-primary/40',
                                  'data-[level="3"]:fill-primary/60',
                                  'data-[level="4"]:fill-primary',
                                )}
                                data-level={level}
                                height={isMobile ? 10 : 12}
                                rx={2}
                                ry={2}
                                width={isMobile ? 10 : 12}
                              />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">{getTooltipText(level)}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }}
                  </ContributionGraphLegend>
                </ContributionGraphFooter>
              </ContributionGraph>
            </TooltipProvider>
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">No activity data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
