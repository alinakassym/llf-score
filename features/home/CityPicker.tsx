import DrawerPicker from '@/shared/ui/DrawerPicker';
import { cities } from '@/shared/mocks/cities';

export default function CityPicker(props: { value?: string; onChange?: (id: string) => void }) {
  const items = cities.map(c => ({ id: c.id, label: c.name, icon: c.image }));
  return (
    <DrawerPicker
      items={items}
      value={props.value}
      onChange={props.onChange}
      showItemIcon
    />
  );
}
