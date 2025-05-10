import { Suspense } from "react";
import CompanyList from "./company-list";
import { CreateCompanyDialog } from "./create-company-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Companies</h1>
        <CreateCompanyDialog />
      </div>
      <Suspense fallback={<CompanyListSkeleton />}>
        <CompanyList />
      </Suspense>
    </div>
  );
}

function CompanyListSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className='border rounded-lg p-6 space-y-4'>
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
          <div className='pt-4 space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </div>
      ))}
    </div>
  );
}
