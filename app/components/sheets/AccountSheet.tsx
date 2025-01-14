import { AvatarFallback } from "@radix-ui/react-avatar";
import { UserRoundIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card } from "../ui/card";

const AccountSheet = () => {
  const { data: session } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="hidden md:flex">
          <UserRoundIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side={"right"} className="flex flex-col [&>button]:hidden">
        <div className="flex items-center justify-between">
          <Badge
            variant={"outline"}
            className="flex w-fit flex-row items-center justify-center gap-1 border-2 border-primary py-1"
          >
            <UserRoundIcon />

            <p className="px-2 font-semibold uppercase">Your account</p>
          </Badge>

          <SheetClose asChild>
            <Button size={"icon"} variant={"ghost"}>
              <XIcon />
            </Button>
          </SheetClose>
        </div>

        <Card className="flex bg-muted p-5">
          <DropdownMenu>
            {session && session.user && (
              <DropdownMenuTrigger className="flex w-full">
                <div className="flex h-full w-full">
                  <Avatar className="flex h-16 w-16">
                    {session.user.image && (
                      <AvatarImage src={session.user.image} />
                    )}

                    <AvatarFallback>
                      {session.user.name && session.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
            )}

            <DropdownMenuContent></DropdownMenuContent>
          </DropdownMenu>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default AccountSheet;
