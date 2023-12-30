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

type AlertProductProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  img?: string;
};

export const AlertProduct: React.FC<AlertProductProps> = ({
  open,
  setOpen,
  img,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Produto fora de estoque</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-4 flex-col">
          <img src={img} alt={img} className="w-[200px] h-[200px]" />
          <div className="flex flex-col gap-4">
            <DialogDescription>
              {
                "O produto acima que você está tentando adicionar ao carrinho está fora de estoque."
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
