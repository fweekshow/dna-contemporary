"use client"

import { useState } from "react"
import { Search, Moon, Sun, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress] = useState("0x1234...5678")
  const [usdcBalance] = useState("1,250.50")

  const connectWallet = () => {
    setIsWalletConnected(!isWalletConnected)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ArtVault
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artists by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Wallet Connect */}
            <Button onClick={connectWallet} variant={isWalletConnected ? "secondary" : "default"} className="gap-2">
              <Wallet className="h-4 w-4" />
              {isWalletConnected ? (
                <div className="flex flex-col items-start">
                  <span className="text-xs">{walletAddress}</span>
                  <span className="text-xs text-muted-foreground">{usdcBalance} USDC</span>
                </div>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
