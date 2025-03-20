export default function Footer() {
  const date = new Date();
  return (
    <footer className="py-10 bg-primary text-center text-white">
      &copy; {date.getFullYear()} Okenana Favour | WeHaul
    </footer>
  );
}
