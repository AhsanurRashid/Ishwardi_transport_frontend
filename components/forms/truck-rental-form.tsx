"use client"

import { useState } from "react"
import { CalendarIcon, Truck, MapPin, User, CreditCard, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  const [pickupDate, setPickupDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()

  const truckTypes = [
    { id: "pickup", name: "Pickup Truck", capacity: "1,500 lbs", price: "$29.95/day", image: "🚚" },
    { id: "cargo-van", name: "Cargo Van", capacity: "3,500 lbs", price: "$39.95/day", image: "🚐" },
    { id: "box-truck", name: "Box Truck (10ft)", capacity: "3,000 lbs", price: "$49.95/day", image: "📦" },
    { id: "box-truck-15", name: "Box Truck (15ft)", capacity: "4,000 lbs", price: "$59.95/day", image: "🚛" },
    { id: "box-truck-20", name: "Box Truck (20ft)", capacity: "5,000 lbs", price: "$69.95/day", image: "🚚" },
    { id: "box-truck-26", name: "Box Truck (26ft)", capacity: "10,000 lbs", price: "$89.95/day", image: "🚛" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Truck className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">TruckRental Pro</h1>
          </div>
          <p className="text-gray-600">Reserve your truck rental in just a few easy steps</p>
        </div>

        <form className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Please provide your contact details</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" placeholder="123 Main Street" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="New York" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Rental Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Rental Details
              </CardTitle>
              <CardDescription>When and where do you need the truck?</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Pickup Location *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown">Downtown Location - 123 Main St</SelectItem>
                    <SelectItem value="airport">Airport Location - 456 Airport Rd</SelectItem>
                    <SelectItem value="north">North Branch - 789 North Ave</SelectItem>
                    <SelectItem value="south">South Branch - 321 South St</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Return Location *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select return location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="same">Same as pickup location</SelectItem>
                    <SelectItem value="downtown">Downtown Location - 123 Main St</SelectItem>
                    <SelectItem value="airport">Airport Location - 456 Airport Rd</SelectItem>
                    <SelectItem value="north">North Branch - 789 North Ave</SelectItem>
                    <SelectItem value="south">South Branch - 321 South St</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pickup Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pickupDate ? pickupDate.toLocaleDateString() : "Select pickup date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={pickupDate} onSelect={setPickupDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Return Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? returnDate.toLocaleDateString() : "Select return date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupTime">Pickup Time *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnTime">Return Time *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Vehicle Selection
              </CardTitle>
              <CardDescription>Choose the truck that best fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="pickup" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {truckTypes.map((truck) => (
                  <div key={truck.id}>
                    <RadioGroupItem value={truck.id} id={truck.id} className="peer sr-only" />
                    <Label
                      htmlFor={truck.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="text-4xl mb-2">{truck.image}</div>
                      <div className="text-center">
                        <div className="font-semibold">{truck.name}</div>
                        <div className="text-sm text-muted-foreground">{truck.capacity}</div>
                        <Badge variant="secondary" className="mt-2">
                          {truck.price}
                        </Badge>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Driver Information */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
              <CardDescription>Primary driver details and license information</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Driver's License Number *</Label>
                <Input id="licenseNumber" placeholder="D123456789" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseState">License State *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseExpiry">License Expiry Date *</Label>
                <Input id="licenseExpiry" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21-24">21-24 years</SelectItem>
                    <SelectItem value="25-29">25-29 years</SelectItem>
                    <SelectItem value="30-39">30-39 years</SelectItem>
                    <SelectItem value="40-49">40-49 years</SelectItem>
                    <SelectItem value="50+">50+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Additional Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Additional Services & Insurance
              </CardTitle>
              <CardDescription>Protect your rental and add convenience services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="insurance" />
                <Label htmlFor="insurance" className="flex-1">
                  <div className="font-medium">Damage Protection (+$19.95/day)</div>
                  <div className="text-sm text-muted-foreground">
                    Covers damage to the vehicle during your rental period
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="roadside" />
                <Label htmlFor="roadside" className="flex-1">
                  <div className="font-medium">24/7 Roadside Assistance (+$9.95/day)</div>
                  <div className="text-sm text-muted-foreground">
                    Emergency roadside assistance including towing and jump starts
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="equipment" />
                <Label htmlFor="equipment" className="flex-1">
                  <div className="font-medium">Moving Equipment Rental (+$29.95)</div>
                  <div className="text-sm text-muted-foreground">Dolly, furniture pads, and tie-down straps</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="additional-driver" />
                <Label htmlFor="additional-driver" className="flex-1">
                  <div className="font-medium">Additional Driver (+$15.95/day)</div>
                  <div className="text-sm text-muted-foreground">Add another authorized driver to the rental</div>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Special Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Special Requirements</CardTitle>
              <CardDescription>Any additional information or special requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Please let us know if you have any special requirements or requests..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>Secure payment processing</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cardName">Cardholder Name *</Label>
                <Input id="cardName" placeholder="John Doe" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date *</Label>
                <Input id="expiry" placeholder="MM/YY" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input id="cvv" placeholder="123" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sameAsPersonal" />
                  <Label htmlFor="sameAsPersonal" className="text-sm">
                    Same as personal address
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pickup Truck (3 days)</span>
                  <span>$89.85</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Damage Protection (3 days)</span>
                  <span>$59.85</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxes & Fees</span>
                  <span>$14.95</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>$164.65</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-primary underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-confirm" required />
                  <Label htmlFor="age-confirm" className="text-sm">
                    I confirm that I am at least 21 years old and have a valid driver's license
                  </Label>
                </div>
                <Button type="submit" className="w-full h-12 text-lg">
                  <Clock className="mr-2 h-5 w-5" />
                  Reserve Now - $164.65
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Your reservation will be confirmed immediately. You can cancel free of charge up to 24 hours before
                  pickup.
                </p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
