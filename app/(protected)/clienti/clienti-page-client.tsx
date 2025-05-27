"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import questions from '@/lib/survey-questions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent,  } from "@/components/ui/tabs"
import { Search, UserPlus, FileText, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Client } from './page'

interface ClientiPageClientProps {
  clients: Client[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  totalClients: number
  searchTerm: string
  avgWeight: number
}

export default function ClientiPageClient({
  clients,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  totalClients,
  searchTerm,

}: ClientiPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchInput, setSearchInput] = useState(searchTerm)

  // Handle search
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term.trim()) {
      params.set("search", term.trim())
    } else {
      params.delete("search")
    }
    params.set("page", "1") // Reset to first page when searching

    startTransition(() => {
      router.push(`/clienti?${params.toString()}`)
    })
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())

    startTransition(() => {
      router.push(`/clienti?${params.toString()}`)
    })
  }

  // Clear search
  const clearSearch = () => {
    setSearchInput("")
    const params = new URLSearchParams(searchParams)
    params.delete("search")
    params.set("page", "1")

    startTransition(() => {
      router.push(`/clienti?${params.toString()}`)
    })
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Tabel Clienti</CardTitle>
            <CardDescription>
              {totalClients} clienți total
              {searchTerm && ` • ${clients.length} rezultate pentru "${searchTerm}"`}
            </CardDescription>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Caută după nume, email, telefon..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchInput)
                  }
                }}
                className="pl-8"
                disabled={isPending}
              />
            </div>
            <Button 
              onClick={() => handleSearch(searchInput)} 
              disabled={isPending}
              size="default"
            >
              Caută
            </Button>
            {searchTerm && (
              <Button 
                onClick={clearSearch} 
                variant="outline" 
                disabled={isPending}
                size="default"
              >
                Șterge
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsContent value="all">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Nume Client</TableHead>
                    <TableHead>Obiectiv Greutate</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Scop Principal</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {!clients || clients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <UserPlus className="h-8 w-8 mb-2" />
                          <p>{searchTerm ? "Nu s-au găsit rezultate" : "No clients found"}</p>
                          <p className="text-sm">
                            {searchTerm 
                              ? "Încearcă să modifici termenii de căutare" 
                              : "Add your first client to get started"
                            }
                          </p>
                          {searchTerm && (
                            <Button onClick={clearSearch} variant="outline" className="mt-2" size="sm">
                              Șterge căutarea
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    clients.map((client: Client) => (
                      <TableRow key={client.id} className="group">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {client.client_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div>{client.client_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {client.created_at ? new Date(client.created_at).toLocaleDateString() : "N/A"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/5 hover:bg-primary/5">
                            {client.five_q || "0"} kg
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{client.client_phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            client.first_q?.includes("slăbesc") ? "default" :
                            client.first_q?.includes("formă") ? "secondary" :
                            client.first_q?.includes("greutate") ? "outline" :
                            "default"
                          }>
                            {client.first_q?.substring(0, 20) || "Not specified"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="default" size="sm" className="h-8 gap-1 cursor-pointer">
                                <FileText className="h-3.5 w-3.5" />
                                <span>Vezi Rezultate</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px]">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <span>Client Results: {client.client_name}</span>
                                </DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="h-[500px] pr-4">
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                                    <div>
                                      <h3 className="text-sm font-medium text-muted-foreground">Nume Client</h3>
                                      <p className="font-medium">{client.client_name}</p>
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-medium text-muted-foreground">Telefon</h3>
                                      <p className="font-medium">{client.client_phone}</p>
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-medium text-muted-foreground">Obiectiv Greutate</h3>
                                      <p className="font-medium">{client.five_q} kg</p>
                                    </div>
                                    <div>
                                      <h3 className="text-sm font-medium text-muted-foreground">Motivation Level</h3>
                                      <div className="flex items-center gap-1 mt-1">
                                        {Array.from({ length: parseInt(client.nine_q) || 0 }).map((_, i) => (
                                          <div key={i} className="w-4 h-1.5 bg-primary rounded-full"></div>
                                        ))}
                                        {Array.from({ length: 5 - (parseInt(client.nine_q) || 0) }).map((_, i) => (
                                          <div key={i} className="w-4 h-1.5 bg-muted rounded-full"></div>
                                        ))}
                                        <span className="ml-2 text-sm">{client.nine_q}/5</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Add the rest of your dialog content here */}
                                  {questions.map((question, index) => {
                                    const answer = client[question.id as keyof Client] as string
                                    if (!answer) return null
                                    
                                    return (
                                      <div key={question.id} className="space-y-2">
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                          {index + 1}. {question.title}
                                        </h3>
                                        <p className="font-medium">{answer}</p>
                                      </div>
                                    )
                                  })}
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  Pagina {currentPage} din {totalPages}
                  <span className="ml-2">
                    ({(currentPage - 1) * 15 + 1}-{Math.min(currentPage * 15, totalClients)} din {totalClients})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevPage || isPending}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === "..." ? (
                          <span className="px-2 py-1 text-muted-foreground">...</span>
                        ) : (
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page as number)}
                            disabled={isPending}
                            className="min-w-[40px]"
                          >
                            {page}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage || isPending}
                  >
                    Următor
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}