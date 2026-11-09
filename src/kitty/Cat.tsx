export default function Cat(props: {
  bowl?: number;
  waterLabel?: string;
  coat: number;
  head: number;
  neck: number;
  state: string;
  label: string;
  onPet: () => void;
  reaction?: number;
}) {
  return (
    <div class="cat-art-placeholder" role="img" aria-label={props.label}>
      Companion artwork coming later
    </div>
  );
}
