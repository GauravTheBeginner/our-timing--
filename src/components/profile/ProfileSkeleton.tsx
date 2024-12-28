import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function ProfileSkeleton() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-6 w-40" />
            <div className="grid gap-4">
              <Card>
                <div className="p-6">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-2 h-8 w-24" />
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-2 h-8 w-24" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}