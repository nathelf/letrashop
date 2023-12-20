import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type CardItemProps = {
  title: string;
  text: string;
  observation?: string;
  icon?: React.ReactNode;
};

/**
 * CardItem
 *
 * @description Componente para exibir informações em cards
 *
 * @param {string} title Titulo do card
 * @param {string} text Texto principal do card
 * @param {string} observation Observação do card
 * @param {React.ReactNode} icon Icone do card
 * @returns
 */
export const CardItem: React.FC<CardItemProps> = ({
  icon,
  text,
  title,
  observation,
}) => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon ? icon : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{text}</div>
        {observation && (
          <p className="text-xs text-muted-foreground">{observation}</p>
        )}
      </CardContent>
    </Card>
  );
};
