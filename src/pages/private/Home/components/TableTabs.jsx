import {Tabs,TabsContent,TabsList,TabsTrigger,} from "@/components/ui/tabs"
import LatestAdmissions from "./LatestAdmissions";
import LatestQueries from "./LatestQueries";

export default function TableTabs({data}) {
    return (
        <div>
            <Tabs defaultValue="admission">
                <TabsList>
                    <TabsTrigger value="admission">Admissions</TabsTrigger>
                    <TabsTrigger value="queries">Queries</TabsTrigger>
                </TabsList>
                <TabsContent value="admission">
                    <LatestAdmissions admissions={data?.admissions} loading={false} />
                </TabsContent>
                <TabsContent value="queries">
                    <LatestQueries queries={data?.queries} loading={false} />
                </TabsContent>
            </Tabs>
        </div>
    );
}