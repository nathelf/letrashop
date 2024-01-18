import { useFormContext } from "../context/useFormContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import ok from "../assets/resources/ok.svg";
import cancel from "../assets/resources/cancel.svg";

type AlertWeightProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export const AlertInvalidChar: React.FC<AlertWeightProps> = ({
  open,
  setOpen,
}) => {
  const { size, type } = useFormContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Caractere não disponível</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-4 flex-col">
          <DialogDescription>
            <span className="flex flex-1 flex-shrink flex-wrap">
              {`O caractere digitado não está disponível no tamanho ${size} e no formato ${type}.`}
            </span>
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[50px]">{""}</TableHead>
                    <TableHead className="w-[50px]">{""}</TableHead> */}
                  <TableHead className="text-center text-sm">
                    {"Tamanho"}
                  </TableHead>
                  <TableHead className="text-center text-sm">
                    {"Formato"}
                  </TableHead>
                  <TableHead className="text-center text-sm">
                    {"Número"}
                  </TableHead>
                  <TableHead className="text-center text-sm">
                    {"Letra"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* classico redondo; moderno quadrado */}
                <TableRow>
                  <TableCell className="text-center text-xs p-1">
                    {"30mm"}
                  </TableCell>
                  <TableCell className="text-center text-xs p-1">
                    {"Redondo"}
                  </TableCell>
                  <TableCell className="text-right text-xs p-2 pl-6">
                    {
                      <img
                        src={cancel}
                        alt="not_available"
                        width={15}
                        height={15}
                      />
                    }
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {<img src={ok} alt="available" width={20} height={20} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center text-xs p-1">
                    {"30mm"}
                  </TableCell>
                  <TableCell className="text-center text-xs p-1">
                    {"Quadrado"}
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {
                      <img
                        src={cancel}
                        alt="not_available"
                        width={15}
                        height={15}
                      />
                    }
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {<img src={ok} alt="available" width={20} height={20} />}
                  </TableCell>
                </TableRow>
                {/* end first row */}
                <TableRow>
                  <TableCell className="text-center text-xs p-1">
                    {"130mm"}
                  </TableCell>
                  <TableCell className="text-center text-xs p-1">
                    {"Redondo"}
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {<img src={ok} alt="available" width={20} height={20} />}
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {<img src={ok} alt="available" width={20} height={20} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center text-xs p-1">
                    {"130mm"}
                  </TableCell>
                  <TableCell className="text-center text-xs p-1">
                    {"Quadrado"}
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {<img src={ok} alt="available" width={20} height={20} />}
                  </TableCell>
                  <TableCell className="text-center p-2 pl-6">
                    {
                      <img
                        src={cancel}
                        alt="not_available"
                        width={15}
                        height={15}
                      />
                    }
                  </TableCell>
                </TableRow>
                {/* end of second row */}
                <TableRow>
                  <TableCell className="text-center text-xs p-1">
                    {"180mm"}
                  </TableCell>
                  <TableCell className="text-center text-xs p-1">
                    {"Redondo"}
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {
                      <img
                        src={cancel}
                        alt="not_available"
                        width={15}
                        height={15}
                      />
                    }
                  </TableCell>
                  <TableCell className="text-center p-2 pl-6">
                    {
                      <img
                        src={cancel}
                        alt="not_available"
                        width={15}
                        height={15}
                      />
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center text-xs p-1">
                    {"180mm"}
                  </TableCell>
                  <TableCell className="text-center text-xs p-1">
                    {"Quadrado"}
                  </TableCell>
                  <TableCell className="text-right p-2 pl-6">
                    {<img src={ok} alt="available" width={20} height={20} />}
                  </TableCell>
                  <TableCell className="text-center p-2 pl-6">
                    {
                      <img
                        src={cancel}
                        alt="not_available"
                        width={15}
                        height={15}
                      />
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button
            className="flex flex-1 w-full h-10"
            type="submit"
            onClick={() => setOpen(false)}
          >
            {"Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
