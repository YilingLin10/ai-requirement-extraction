import Link from 'next/link'
import React from 'react'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { Atom, SquareUser } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/auth'
import { ModeToggle } from './mode-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <header className='h-[64px] border-b border-zinc-400'>
        <nav className='flex items-center justify-between h-full lg:px-56 md:px-24 px-8'>
            <div>
                <Link className='flex items-center font-bold' href='/'>
                  <Atom className='mr-4'/> 
                  <span className='hidden sm:inline lg:text-xl '>
                  Requirement Extraction
                  </span>
                </Link>
            </div>
            <div className='flex items-center space-x-4'>
                <ModeToggle />
                <Button variant="link" asChild>
                  <Link href='/purchase'>Purchase</Link>
                </Button>
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        <SquareUser size={24} />
                        {user.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href='/profile'>
                            Profile 
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <form 
                            action={async() => {
                              "use server"
                              await signOut({
                                redirectTo: '/'
                              })
                            }}
                          >
                          <button type='submit'>Sign out</button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {!user && (
                  <Button>
                    <Link href='/sign-in'>Sign in</Link>
                  </Button>
                )}
            </div>
        </nav>
    </header>
  )
}