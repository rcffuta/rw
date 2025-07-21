import Header from "../../components/Common/Header";
import InitializeStores from "@/components/Common/InitilizeStores";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
      <>
          <Header />
          {children}
          <InitializeStores />
      </>
  );
}
