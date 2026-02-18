import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {Field,FieldDescription,FieldGroup,FieldLabel,FieldLegend,FieldSet,} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { MoveRight, RefreshCcw, CheckCircle, XCircle, Loader2 } from "lucide-react"
import useSubmitAdmissionForm from "../../../../hooks/useSubmitAdmissionForm"

export default function Application() {
    const {formData,errors,submitState,handleChange,handleSubmit,handleReset } = useSubmitAdmissionForm()

    const getSubmitButtonContent = () => {
        switch (submitState) {
            case "submitting":
                return (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                    </>
                )
            case "submitted":
                return (
                    <>
                        <CheckCircle className="w-4 h-4" />
                        Submitted
                    </>
                )
            case "error":
                return (
                    <>
                        <XCircle className="w-4 h-4" />
                        Failed to Submit
                    </>
                )
            default:
                return (
                    <>
                        Submit
                        <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                    </>
                )
        }
    }

    return (
        <div id='application-form' className='relative w-full scroll-mt-50'>
            <div className='container py-8 lg:py-16 grid place-items-center px-4 w-full'>
                <div className='space-y-8 grid place-items-center w-full'>
                    <h1 className='font-serif'>Application Form</h1>
                    <div className='border rounded-lg w-full p-4 lg:p-8 md:w-xl shadow'>
                        <form onSubmit={handleSubmit}>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Personal Details</FieldLegend>
                                    <FieldDescription>
                                        All related data are stored secure and encrypted
                                    </FieldDescription>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel>Full Name *</FieldLabel>
                                            <Input
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                placeholder="Shyan Raj Pandey"
                                                required
                                            />
                                            {errors.full_name && (
                                                <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
                                            )}
                                        </Field>
                                        <FieldSet className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <Field>
                                                <FieldLabel>Father Name *</FieldLabel>
                                                <Input
                                                    name="father_name"
                                                    value={formData.father_name}
                                                    onChange={handleChange}
                                                    placeholder="Hem Raj Pandey"
                                                    required
                                                />
                                                {errors.father_name && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.father_name}</p>
                                                )}
                                            </Field>
                                            <Field>
                                                <FieldLabel>Mother Name *</FieldLabel>
                                                <Input
                                                    name="mother_name"
                                                    value={formData.mother_name}
                                                    onChange={handleChange}
                                                    placeholder="Sarita Chattri Pandey"
                                                    required
                                                />
                                                {errors.mother_name && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.mother_name}</p>
                                                )}
                                            </Field>
                                        </FieldSet>

                                        <FieldSet className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <Field>
                                                <FieldLabel>Contact Number *</FieldLabel>
                                                <Input
                                                    name="contact_no"
                                                    value={formData.contact_no}
                                                    onChange={handleChange}
                                                    placeholder="9812345678"
                                                    type="tel"
                                                    maxLength="10"
                                                    required
                                                />
                                                <FieldDescription>
                                                    Enter 10-digit mobile number
                                                </FieldDescription>
                                                {errors.contact_no && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.contact_no}</p>
                                                )}
                                            </Field>
                                            <Field>
                                                <FieldLabel>Address *</FieldLabel>
                                                <Input
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="Kathmandu, Nepal"
                                                    required
                                                />
                                                {errors.address && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                                                )}
                                            </Field>
                                        </FieldSet>

                                        <FieldSet>
                                            <FieldLegend>School Details</FieldLegend>
                                            <FieldDescription>
                                                Add previous educational details
                                            </FieldDescription>
                                            <Field>
                                                <FieldLabel>Previous School Name *</FieldLabel>
                                                <Input
                                                    name="previous_school_name"
                                                    value={formData.previous_school_name}
                                                    onChange={handleChange}
                                                    placeholder="Shikshadeep Academy"
                                                    required
                                                />
                                                {errors.previous_school_name && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.previous_school_name}</p>
                                                )}
                                            </Field>
                                            <FieldSet className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                <Field>
                                                    <FieldLabel>Current Grade *</FieldLabel>
                                                    <Input
                                                        name="current_grade"
                                                        value={formData.current_grade}
                                                        onChange={handleChange}
                                                        placeholder="8"
                                                        type="number"
                                                        min="1"
                                                        max="9"
                                                        required
                                                    />
                                                    <FieldDescription>
                                                        Grade you're applying for
                                                        (1-9)
                                                    </FieldDescription>
                                                    {errors.current_grade && (
                                                        <p className="text-xs text-red-500 mt-1">{errors.current_grade}</p>
                                                    )}
                                                </Field>
                                                <Field>
                                                    <FieldLabel>Percentage or Grade *</FieldLabel>
                                                    <Input
                                                        name="academic_results"
                                                        value={formData.academic_results}
                                                        onChange={handleChange}
                                                        placeholder="95% || A+"
                                                        required
                                                    />
                                                    <FieldDescription>
                                                        Enter (%) or (A, A+) from previous grade
                                                    </FieldDescription>
                                                    {errors.academic_results && (
                                                        <p className="text-xs text-red-500 mt-1">{errors.academic_results}</p>
                                                    )}
                                                </Field>
                                            </FieldSet>
                                        </FieldSet>

                                        <Field>
                                            <FieldLabel>Remarks (Optional)</FieldLabel>
                                            <Textarea
                                                name="remarks"
                                                value={formData.remarks}
                                                onChange={handleChange}
                                                placeholder="Any additional information you'd like to share..."
                                                rows={4}
                                            />
                                            <FieldDescription>
                                                Share any special requirements or additional information.
                                                <br />
                                                <span className="text-xs text-gray-500">
                                                    (*Optional) Once submitted, you cannot edit this form.
                                                </span>
                                            </FieldDescription>
                                        </Field>

                                        <Field orientation="horizontal">
                                            <Button
                                                type="submit"
                                                disabled={submitState === "submitting" || submitState === "submitted"}
                                                className={`group lg:w-fit cursor-pointer shadow-md hover:shadow-lg 
                                                transition-all flex items-center gap-2 py-3 rounded-full px-8! lg:px-12! ${submitState === "submitted"
                                                        ? "bg-green-600 hover:bg-green-600"
                                                        : submitState === "error"
                                                            ? "bg-red-600 hover:bg-red-600"
                                                            : "bg-(--blueDark)"
                                                    }`}
                                            >
                                                {getSubmitButtonContent()}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                type="button"
                                                onClick={handleReset}
                                                disabled={submitState === "submitting"}
                                                className="group lg:w-fit cursor-pointer shadow-md hover:shadow-lg 
                                                transition-all flex items-center gap-2 py-3 rounded-full px-8! lg:px-12!"
                                            >
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