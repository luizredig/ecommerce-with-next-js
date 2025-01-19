import { Card, CardContent } from "../../components/ui/card";

const Footer = () => {
  return (
    <>
      <Card className="w-full rounded-none border-x-0 border-b-0">
        <CardContent className="p-5 md:px-24">
          <p className="text-sm text-[#525252] sm:text-base">
            @ 2024 Copyright{" "}
            <span className="font-semibold">redig | FSW Store</span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default Footer;
