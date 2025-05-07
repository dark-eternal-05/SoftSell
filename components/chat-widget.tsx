"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type Message = {
  role: "user" | "assistant"
  content: string
}

const exampleQuestions = [
  "How do I sell my license?",
  "What types of licenses do you accept?",
  "How long does the process take?",
  "How much can I get for my license?",
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm SoftSell's virtual assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, you would use the OpenAI API with your key
      // For demo purposes, we'll simulate a response
      let response

      try {
        // This would work if an OpenAI API key is provided
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `You are a helpful assistant for SoftSell, a company that helps people sell their software licenses. 
          Answer the following question concisely: ${input}`,
        })
        response = text
      } catch (error) {
        // Fallback responses based on common questions
        if (input.toLowerCase().includes("sell")) {
          response =
            "To sell your license, simply fill out our contact form with your license details. Our team will evaluate it and provide you with a quote within 24 hours."
        } else if (input.toLowerCase().includes("type")) {
          response =
            "We accept most enterprise software licenses, including Microsoft, Adobe, Oracle, SAP, and many others. You can specify your license type in our contact form."
        } else if (input.toLowerCase().includes("time") || input.toLowerCase().includes("long")) {
          response =
            "The entire process typically takes 3-5 business days from submission to payment. Valuations are provided within 24 hours."
        } else if (input.toLowerCase().includes("much") || input.toLowerCase().includes("price")) {
          response =
            "The value of your license depends on several factors including type, remaining validity, and market demand. Enterprise licenses can fetch up to 70% of their original value."
        } else {
          response =
            "Thanks for your question. Our team would be happy to provide more specific information. Please fill out our contact form, and we'll get back to you shortly."
        }
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: response }])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again later." },
      ])
      setIsLoading(false)
    }
  }

  const handleExampleClick = (question: string) => {
    setInput(question)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[90%] sm:w-[400px] shadow-xl"
          >
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/10 flex flex-row items-center justify-between p-4">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">SoftSell Assistant</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[350px] overflow-y-auto p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                        <div className="flex space-x-2">
                          <div
                            className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                {messages.length === 1 && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {exampleQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleExampleClick(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>
  )
}
