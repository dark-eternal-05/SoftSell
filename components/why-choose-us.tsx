"use client"

import { motion } from "framer-motion"
import { Shield, Clock, BadgeDollarSign, Award } from "lucide-react"

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Transactions",
      description: "Bank-level security protocols protect your data and financial information.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Fast Processing",
      description: "Get valuations within 24 hours and payment within 3 business days.",
    },
    {
      icon: <BadgeDollarSign className="h-8 w-8 text-primary" />,
      title: "Best Market Rates",
      description: "Our network of buyers ensures you get the highest possible value.",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Expert Support",
      description: "Our team of license specialists guides you through every step.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-muted-foreground md:text-xl max-w-[700px]"
          >
            SoftSell has helped thousands of customers sell their software licenses with confidence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
