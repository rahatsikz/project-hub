"use client";
import { useGetMyCompanies } from "@/api/company.query";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Company } from "@/types";
import { Building2, FolderKanban, Loader2, Users } from "lucide-react";

export default function CompanyList() {
  const { data, isFetching } = useGetMyCompanies("");
  if (isFetching)
    return (
      <div className='flex items-center gap-2'>
        <Loader2 className='animate-spin size-4' />
        <span>Loading...</span>
      </div>
    );
  return (
    <div>
      {data?.map((company: Company) => (
        <CompanyCard key={company.id} {...{ company }} />
      ))}
    </div>
  );
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='pb-2'>
        <CardTitle className='flex items-center gap-2'>
          <Building2 className='h-5 w-5 text-muted-foreground' />
          {company.name}
        </CardTitle>
        <CardDescription>
          Created on {new Date(company.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            <Users className='h-4 w-4 text-muted-foreground' />
            <span>{company.users.length} users</span>
          </div>
          <div className='flex items-center gap-1'>
            <FolderKanban className='h-4 w-4 text-muted-foreground' />
            <span>{company.projects.length} projects</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex flex-wrap gap-2'>
          {company.teams.map((team) => (
            <Badge key={team.id} variant='outline'>
              {team.name}
            </Badge>
          ))}
          {company.teams.length === 0 && (
            <span className='text-sm text-muted-foreground'>No teams</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
