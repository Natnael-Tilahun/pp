import { Metadata } from "next"
import Image from "next/image"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { CodeViewer } from "@/components/askAi/code-viewer"
import { MaxLengthSelector } from "@/components/askAi/maxlength-selector"
import { ModelSelector } from "@/components/askAi/model-selector"
import { PresetActions } from "@/components/askAi/preset-actions"
import { PresetSave } from "@/components/askAi/preset-save"
import { PresetSelector } from "@/components/askAi/preset-selector"
import { PresetShare } from "@/components/askAi/preset-share"
import { TemperatureSelector } from "@/components/askAi/temperature-selector"
import { TopPSelector } from "@/components/askAi/top-p-selector"
import { ChatInterface } from "@/components/askAi/chat-interface"
import { models, types } from "@/components/askAi/data/models"
import { presets } from "@/components/askAi/data/presets"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ModelDisplay } from "@/components/model-display"

export const metadata: Metadata = {
    title: "Playground",
    description: "The OpenAI Playground built using the components.",
}

export default function PlaygroundPage() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />

                <div className="md:hidden">
                    <Image
                        src="/examples/playground-light.png"
                        width={1280}
                        height={916}
                        alt="Playground"
                        className="block dark:hidden"
                    />
                    <Image
                        src="/examples/playground-dark.png"
                        width={1280}
                        height={916}
                        alt="Playground"
                        className="hidden dark:block"
                    />
                </div>
                <div className="hidden h-full flex-col md:flex px-6">
                    <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-lg font-semibold">Playground</h2>
                            <ModelDisplay />
                        </div>
                        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                            <PresetSelector presets={presets} />
                            <PresetSave />
                            <div className="hidden space-x-2 md:flex">
                                <CodeViewer />
                                <PresetShare />
                            </div>
                            <PresetActions />
                        </div>
                    </div>
                    <Separator />
                    <Tabs defaultValue="chat" className="flex-1">
                        <div className="container h-full py-6">
                            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                                    <div className="grid gap-2">
                                        <HoverCard openDelay={200}>
                                            <HoverCardTrigger asChild>
                                                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Mode
                                                </span>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-[320px] text-sm" side="left">
                                                Choose the interface that best suits your task. You can
                                                provide: a simple prompt to complete, starting and ending
                                                text to insert a completion within, or some text with
                                                instructions to edit it.
                                            </HoverCardContent>
                                        </HoverCard>
                                        <TabsList className="grid grid-cols-4">
                                            <TabsTrigger value="chat">
                                                <span className="sr-only">Chat</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </TabsTrigger>
                                            <TabsTrigger value="complete">
                                                <span className="sr-only">Complete</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    className="h-5 w-5"
                                                >
                                                    <rect
                                                        x="4"
                                                        y="3"
                                                        width="12"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="4"
                                                        y="7"
                                                        width="12"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="4"
                                                        y="11"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="4"
                                                        y="15"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="8.5"
                                                        y="11"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="8.5"
                                                        y="15"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="13"
                                                        y="11"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                </svg>
                                            </TabsTrigger>
                                            <TabsTrigger value="insert">
                                                <span className="sr-only">Insert</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <rect
                                                        x="4"
                                                        y="15"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="8.5"
                                                        y="15"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="13"
                                                        y="15"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                </svg>
                                            </TabsTrigger>
                                            <TabsTrigger value="edit">
                                                <span className="sr-only">Edit</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    className="h-5 w-5"
                                                >
                                                    <rect
                                                        x="4"
                                                        y="3"
                                                        width="12"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="4"
                                                        y="7"
                                                        width="12"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="4"
                                                        y="11"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="4"
                                                        y="15"
                                                        width="4"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <rect
                                                        x="8.5"
                                                        y="11"
                                                        width="3"
                                                        height="2"
                                                        rx="1"
                                                        fill="currentColor"
                                                    ></rect>
                                                    <path
                                                        d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <ModelSelector types={types} models={models} />
                                    <TemperatureSelector defaultValue={[0.56]} />
                                    <MaxLengthSelector defaultValue={[256]} />
                                    <TopPSelector defaultValue={[0.9]} />
                                </div>
                                <div className="md:order-1">
                                    <TabsContent value="chat" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4 ">
                                            <ChatInterface />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="complete" className="mt-0 border-0 p-0">
                                        <div className="flex h-full flex-col space-y-4">
                                            <Textarea
                                                placeholder="Write a tagline for an ice cream shop"
                                                className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <Button>Submit</Button>
                                                <Button variant="secondary">
                                                    <span className="sr-only">Show history</span>
                                                    <RotateCcw />
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="insert" className="mt-0 border-0 p-0">
                                        <div className="flex flex-col space-y-4">
                                            <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                                                <Textarea
                                                    placeholder="We're writing to [inset]. Congrats from OpenAI!"
                                                    className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                                                />
                                                <div className="rounded-md border bg-muted"></div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button>Submit</Button>
                                                <Button variant="secondary">
                                                    <span className="sr-only">Show history</span>
                                                    <RotateCcw />
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="edit" className="mt-0 border-0 p-0">
                                        <div className="flex flex-col space-y-4">
                                            <div className="grid h-full gap-6 lg:grid-cols-2">
                                                <div className="flex flex-col space-y-4">
                                                    <div className="flex flex-1 flex-col space-y-2">
                                                        <Label htmlFor="input">Input</Label>
                                                        <Textarea
                                                            id="input"
                                                            placeholder="We is going to the market."
                                                            className="flex-1 lg:min-h-[580px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col space-y-2">
                                                        <Label htmlFor="instructions">Instructions</Label>
                                                        <Textarea
                                                            id="instructions"
                                                            placeholder="Fix the grammar."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button>Submit</Button>
                                                <Button variant="secondary">
                                                    <span className="sr-only">Show history</span>
                                                    <RotateCcw />
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}