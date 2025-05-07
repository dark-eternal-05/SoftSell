import type { Metadata } from "next"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import ContactForm from "@/components/contact-form"
import ChatWidget from "@/components/chat-widget"

export const metadata: Metadata = {
  title: "SoftSell - The Easiest Way to Sell Your Software Licenses",
  description:
    "SoftSell helps you quickly and securely sell your unused software licenses for the best price on the market.",
  keywords: "software license, sell license, license marketplace, software resale",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <ContactForm />
      <ChatWidget />
    </main>
  )
}
