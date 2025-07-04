export type RepositoryIssue = {
  id: string;
  title: string;
  url: string;
  repoName: string;
  language: string;
  difficulty: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  repoUrl: string;
};

export type ColumnDef<T> = {
  id: string;
  header: string | ((props: any) => React.ReactNode);
  cell: (props: any) => React.ReactNode;
  accessorKey?: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
};