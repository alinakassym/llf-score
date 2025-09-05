import DrawerPicker from "@/shared/ui/DrawerPicker";
import { leagues } from "@/shared/mocks/leagues";

export default function LeaguePicker(props: {
  value?: string;
  onChange?: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const items = leagues.map((l) => ({ id: l.id, label: l.name }));
  return (
    <DrawerPicker
      items={items}
      value={props.value}
      onChange={props.onChange}
      showItemIcon={false}
      marginTop={184}
      open={props.open}
      onOpenChange={props.onOpenChange}
    />
  );
}
