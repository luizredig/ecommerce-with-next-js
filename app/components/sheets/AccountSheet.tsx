import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOutIcon, UserRoundIcon, XIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
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
import { Separator } from "../ui/separator";

const AccountSheet = () => {
  const { data: session } = useSession();

  const handleLogOut = async () => {
    signOut();
  };

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
            <UserRoundIcon size={16} />

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
                <div className="flex h-full w-full gap-2">
                  <Avatar className="flex h-16 w-16">
                    {session.user.image && (
                      <>
                        <AvatarImage src={session.user.image} />
                      </>
                    )}

                    <AvatarFallback>
                      {session.user.name && session.user.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-1 items-center gap-4">
                    <Separator
                      orientation={"vertical"}
                      className="h-2/3 w-[2px] rounded-full bg-primary"
                    />

                    <div className="flex flex-1 items-center">
                      <p>{session.user.name}</p>
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
            )}

            <DropdownMenuContent className="flex flex-col bg-muted">
              <Button
                variant={"ghost"}
                onClick={handleLogOut}
                className="flex gap-2"
              >
                <LogOutIcon size={16} />

                <p>Logout</p>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default AccountSheet;
