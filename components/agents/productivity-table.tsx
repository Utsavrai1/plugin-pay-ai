import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProductivityTableProps {
  agentData: any[]
}

export function ProductivityTable({ agentData }: ProductivityTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent</TableHead>
          <TableHead className="text-right">Deals</TableHead>
          <TableHead className="text-right">Emails</TableHead>
          <TableHead className="text-right">Calls</TableHead>
          <TableHead className="text-right">Talktime (min)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agentData.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                  <AvatarFallback>{agent.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{agent.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">{agent.deals}</TableCell>
            <TableCell className="text-right">{agent.emails}</TableCell>
            <TableCell className="text-right">{agent.calls}</TableCell>
            <TableCell className="text-right">{agent.talktime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
