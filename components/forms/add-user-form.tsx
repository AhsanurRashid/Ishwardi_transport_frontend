"use client"
import React from 'react'
import { FileUploader } from '../common/file-uploader'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import { AddUserFormSchema } from '@/lib/schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const AddUserForm = () => {

  const form = useForm<z.infer<typeof AddUserFormSchema>>({
    resolver: zodResolver(AddUserFormSchema),
    defaultValues: {
      name: "",
      number: "",
      documents: [],
    },
  })

  const onSubmit = (data: z.infer<typeof AddUserFormSchema>) => {
    console.log("Form submitted:", data)
  }
  
  return (
    <ScrollArea className="h-[430px] pr-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Documents:</FormLabel>
                    <FormControl>
                      <FileUploader 
                        onFilesChange={(files) => {
                          field.onChange(files)
                        }}
                      />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button className="w-full" type="submit">Create</Button>
        </form>
      </Form>
    </ScrollArea>
  )
}

export default AddUserForm
