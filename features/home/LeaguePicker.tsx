import DrawerPicker from "@/shared/ui/DrawerPicker";
import { leagues } from "@/shared/mocks/leagues";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function LeaguePicker(props: {
  value?: string;
  onChange?: (id: string) => void;
}) {
  const { colors } = useAppTheme();
  const items = leagues.map((l) => ({ id: l.id, label: l.name }));
  return (
    <DrawerPicker
      items={items}
      value={props.value}
      onChange={props.onChange}
      showItemIcon={false}
      color={colors.text}
      backgroundColor={colors.bg}
    />
  );
}
