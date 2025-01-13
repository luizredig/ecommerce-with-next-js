import { UserRoundIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { AvatarFallback } from "@radix-ui/react-avatar";

const AccountSheet = () => {
  const { data: session } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="hidden md:flex">
          <UserRoundIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side={"right"}>
        <SheetHeader>Your account</SheetHeader>
        {session && session.user && (
          <>
            <Avatar>
              {session.user.image && <AvatarImage src={session.user.image} />}
              <AvatarFallback>
                {session.user.name && session.user.name[0]}
              </AvatarFallback>
            </Avatar>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AccountSheet;
