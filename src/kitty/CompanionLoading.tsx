export default function CompanionLoading(props: { title: string; subtitle?: string }) {
  return (
    <section class="companion-loading" role="status" aria-live="polite" aria-busy="true">
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
      <div class="loading-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
