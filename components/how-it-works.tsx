"use client"

import { motion } from "framer-motion"
import { Upload, DollarSign, CreditCard } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "Upload License",
      description: "Submit your license details through our secure portal for verification.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: "Get Valuation",
      description: "Receive a competitive market valuation within 24 hours.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Get Paid",
      description: "Accept our offer and get paid via your preferred payment method.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-muted-foreground md:text-xl max-w-[700px]"
          >
            Our simple three-step process makes selling your software licenses quick and hassle-free.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm"
            >
              <div className="rounded-full bg-primary/10 p-4 mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
