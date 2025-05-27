import SurveyForm from "@/app/survey/Surveyform"


export default async function SurveyPage({ searchParams }: { searchParams: { id?: string } }) {
  const userId = searchParams.id || "";

  return (
    <div
      className="min-h-screen bg-cover bg-center"
    >
      <div className="min-h-screen bg-linear-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-center">
        {!userId ? (
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600">Link invalid</h2>
            <p>Acest link nu este valid. Te rugăm să contactezi antrenorul tău pentru un link corect.</p>
          </div>
        ) : (
          <SurveyForm userId={userId} />
        )}
      </div>
    </div>
  )
}
