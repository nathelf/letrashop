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

type AlertWeightProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export const AlertWeight: React.FC<AlertWeightProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Limite de peso ultrapassado</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-4 flex-col">
          <div className="flex flex-col gap-4">
            <DialogDescription>
              {
                "O pedido ultrapassa o limite de peso do mini envio. Por favor, remova alguns produtos do carrinho."
              }
            </DialogDescription>
          </div>
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
