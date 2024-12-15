import { Tabs } from '@radix-ui/themes'

export default function Nav() {
    return (
        <Tabs.Root defaultValue="canvas" className="w-96">
            <Tabs.List size="2" className="flex flex-col items-start">
                <Tabs.Trigger value="canvas">
                    <div className="w-screen">Canvas</div>
                </Tabs.Trigger>
                <Tabs.Trigger value="other">
                    <div className="w-screen">Other</div>
                </Tabs.Trigger>
                <Tabs.Trigger value="settings">
                    <div className="w-screen">Settings</div>
                </Tabs.Trigger>
            </Tabs.List>
        </Tabs.Root>
    )
}
