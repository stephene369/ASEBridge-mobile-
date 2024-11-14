import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionChevron, AccordionContent } from "@/components/ui/accordion";

export default function GradeTable ({ Data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(Data[0] || {}).map((key) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
          <TableHead className="w-[50px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Accordion type="single" collapsible>
                <AccordionItem value={`user-${index}`}>
                  <AccordionTrigger className="flex items-center gap-2">
                    <span>{item.Name}</span>
                    <div className="ml-auto" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Address</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>State</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{item.Address}</TableCell>
                          <TableCell>{item.City}</TableCell>
                          <TableCell>{item.State}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
            <TableCell>{item.Email}</TableCell>
            <TableCell>{item.Phone}</TableCell>
            <TableCell />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
