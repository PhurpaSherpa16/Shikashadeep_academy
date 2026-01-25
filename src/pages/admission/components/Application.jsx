import { Input } from "@/components/ui/input"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { MoveRight, RefreshCcw } from "lucide-react"

export default function Application() {
    return (
        <div id='application-form' className='relative w-full scroll-mt-50'>
                <div className='container py-8 lg:py-16 grid place-items-center px-4 w-full'>
                    <div className='space-y-8 grid place-items-center w-full'>
                        <h1 className='font-serif'>Application Form</h1>
                        <div className='border rounded-lg w-full p-4 lg:p-8 md:w-xl shadow'>
                            <form>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>Personal Details</FieldLegend>
                                        <FieldDescription>
                                            All related data are stored secure and encrypted
                                        </FieldDescription>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel>Full Name *</FieldLabel>
                                                <Input placeholder="Shyan Raj Pandey" required />
                                            </Field>
                                            <FieldSet className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                <Field>
                                                    <FieldLabel>Father Name *</FieldLabel>
                                                    <Input placeholder="Hem Raj Pandey" required />
                                                </Field>
                                                <Field>
                                                    <FieldLabel>Mother Name *</FieldLabel>
                                                    <Input placeholder="Sarita Chattri Pandey" required />
                                                </Field>
                                            </FieldSet>
                                            <FieldSet>
                                                <FieldLegend>School Details</FieldLegend>
                                                <FieldDescription>
                                                    Add previous educational details
                                                </FieldDescription>
                                                <Field>
                                                    <FieldLabel>School Name</FieldLabel>
                                                    <Input placeholder="Shikshadeep Academy" required />
                                                </Field>
                                                <FieldSet className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                    <Field>
                                                        <FieldLabel>Class *</FieldLabel>
                                                        <Input placeholder="8" type="number" min="1" max="9" required />
                                                        <FieldDescription>
                                                            In which class your read
                                                        </FieldDescription>
                                                    </Field>
                                                    <Field>
                                                        <FieldLabel>Percentage or Grade *</FieldLabel>
                                                        <Input placeholder="95% || A+" required />
                                                        <FieldDescription>
                                                            Enter (%) or (A, A+) according to your previous grade
                                                        </FieldDescription>
                                                    </Field>
                                                </FieldSet>
                                            </FieldSet>
                                            <Field orientation="horizontal">
                                                <Button type="submit" className='group bg-(--blueDark) lg:w-fit cursor-pointer shadow-md hover:shadow-lg 
                                                transition-all flex items-center gap-2 py-3 rounded-full px-8! lg:px-12!'>
                                                    Submit
                                                    <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                                                </Button>
                                                <Button variant="outline" type="button" className="group lg:w-fit cursor-pointer shadow-md hover:shadow-lg 
                                                transition-all flex items-center gap-2 py-3 rounded-full px-8! lg:px-12!">
                                                    <RefreshCcw className="transition-transform duration-300 group-hover:rotate-180 origin-center" />
                                                    Reset
                                                </Button>
                                            </Field>
                                        </FieldGroup>
                                    </FieldSet>
                                </FieldGroup>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}