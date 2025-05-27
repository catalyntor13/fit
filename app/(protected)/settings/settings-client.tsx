"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, KeyRound, Mail, Edit, Shield } from 'lucide-react'
import UserProfileEditForm from "@/app/(protected)/settings/change-name"
import ChangePasswordForm from "@/app/(protected)/settings/change-password"
import ChangeEmailForm from "@/app/(protected)/settings/change-email"

interface SettingsClientProps {
  user: any // Replace with proper User type
  profile: any // Replace with proper Profile type
}

export default function SettingsClient({ user, profile }: SettingsClientProps) {
  return (
    <div className="space-y-6">
      <div className="p-5">
        <h1 className="text-3xl font-bold tracking-tight">Setari</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none h-auto p-3 ">
          <TabsTrigger value="account" className="cursor-pointer">Account</TabsTrigger>
          <TabsTrigger value="security" className="cursor-pointer">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and update your personal information
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <UserProfileEditForm initialProfile={profile} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Full Name</span>
                  </div>
                  <div className="font-medium">{profile?.full_name || "Not set"}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email Address</span>
                  </div>
                  <div className="font-medium">{user.email}</div>
                 
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Status Abonament</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-500">Active</Badge>
                  <span className="text-sm text-muted-foreground">30 zile pana cand abonamentul expira</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">

                     {/* Change Password  */}
                <div className="flex items-center justify-between mb-10">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <KeyRound className="h-4 w-4" />
                      <h3 className="font-medium">Password</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly to keep your account secure
                    </p>
                  </div>
                  <ChangePasswordForm />
                </div>
                       {/* Change E-mail  */}

                  {/* Change E-mail  */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <h3 className="font-medium">E-mail</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      If you need to update your e-mail, please check here
                    </p>
                  </div>
                 <ChangeEmailForm />
                </div>
                     {/* Change E-mail  */}
                
                <Separator />
                
            
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}