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
  img?: string | string[];
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
          {typeof img === "string" ? (
            <img src={img} alt={img} className="w-[200px] h-[200px]" />
          ) : (
            img !== undefined &&
            img?.length > 0 && (
              <div className="flex flex-1 w-full max-w-[804px] h-full min-h-[120px] justify-center items-center content-center break-words gap-6 p-6">
                <div className="flex flex-wrap w-full flex-row justify-center items-center content-center break-words">
                  {img.map((_img, index) => (
                    <img
                      key={index}
                      src={_img}
                      alt={_img}
                      className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[90px] lg:h-[90px] p-1"
                    />
                  ))}
                </div>
              </div>
            )
          )}
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
