import React from 'react';

export const KKProfilePrint = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="
        bg-white text-black font-arial leading-tight text-[10.5pt]
        print:text-[10pt] print:leading-tight
        print:m-[0.75in_0.5in_0.75in_0.5in]
      "
    >

      {/* ==================== PAGE 1 ==================== */}

      {/* HEADER */}
      <div className="text-center mb-4 print:mb-1">
        <p className="text-[9.5pt] leading-none">Republic of the Philippines</p>
        <p className="text-[9.5pt] leading-none">Province of Northern Samar</p>
        <p className="text-[9.5pt] leading-none">Municipality of Catarman</p>
        <p className="font-bold text-[10.5pt] mt-2 leading-tight">
          BARANGAY <span className="border-b border-black px-2">OLD RIZAL</span>
        </p>
        <p className="text-[9pt] mt-1">-oOo-</p>
        <p className="font-bold text-[11pt] mt-2 uppercase tracking-wide">
          Office of the Sangguniang Kabataan
        </p>
        <h2 className="font-bold text-[10.5pt] mt-3 uppercase underline decoration-1 underline-offset-2">
          Summary of Katipunan ng Kabataan Profile
        </h2>

        {/* ← Automatic current date */}
        <p className="italic text-[9.5pt] mt-1">
          as of {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      {/* OVERVIEW */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">OVERVIEW</h3>
        <table className="w-full border-collapse border border-black text-[10pt]">
          <tbody>
            <tr>
              <td className="border px-2 py-1">Total No. of Purok/SK Members</td>
              <td className="border px-2 py-1 text-center w-24">0</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Total No. of Youths who Belong to the KK Profile</td>
              <td className="border px-2 py-1 text-center w-24">0</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Total No. of Out-of-School SK Members</td>
              <td className="border px-2 py-1 text-center w-24">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border px-2 py-1 uppercase">TOTAL</td>
              <td className="border px-2 py-1 text-center">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* AGE GROUP AND SEX ASSIGNED AT BIRTH */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">AGE GROUP AND SEX ASSIGNED AT BIRTH</h3>
        <table className="w-full border-collapse border border-black text-[9.8pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">SEX</th>
              <th className="border py-1 px-1">15-17</th>
              <th className="border py-1 px-1">18-24</th>
              <th className="border py-1 px-1">25-30</th>
              <th className="border py-1 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border py-1 px-2 text-left">Male</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Female</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr className="font-bold"><td className="border py-1 px-2 uppercase text-left">TOTAL</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
          </tbody>
        </table>
      </section>

      {/* CHILD YOUTH */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">CHILD YOUTH</h3>
        <table className="w-full border-collapse border border-black text-[10pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">SEX</th>
              <th className="border py-1 px-1">15</th>
              <th className="border py-1 px-1">16</th>
              <th className="border py-1 px-1">17</th>
              <th className="border py-1 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border py-1 px-2 text-left">Male</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Female</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr className="font-bold"><td className="border py-1 px-2 uppercase text-left">TOTAL</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
          </tbody>
        </table>
      </section>

      {/* CORE YOUTH */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">CORE YOUTH</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">SEX</th>
              <th className="border py-1 px-1">18</th>
              <th className="border py-1 px-1">19</th>
              <th className="border py-1 px-1">20</th>
              <th className="border py-1 px-1">21</th>
              <th className="border py-1 px-1">22</th>
              <th className="border py-1 px-1">23</th>
              <th className="border py-1 px-1">24</th>
              <th className="border py-1 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 px-2 text-left">Male</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left">Female</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* YOUNG ADULT */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">YOUNG ADULT</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">SEX</th>
              <th className="border py-1 px-1">25</th>
              <th className="border py-1 px-1">26</th>
              <th className="border py-1 px-1">27</th>
              <th className="border py-1 px-1">28</th>
              <th className="border py-1 px-1">29</th>
              <th className="border py-1 px-1">30</th>
              <th className="border py-1 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 px-2 text-left">Male</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left">Female</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
            </tr>
            <tr className="font-bold bg-gray-50/50">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
              <td className="border py-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      

      {/* CIVIL STATUS */}
      <section className="mb-4 print:mb-1 print:page-break-after:always print:page-break-inside:avoid">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">CIVIL STATUS</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center print:break-inside-avoid">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2">AGE</th>
              <th className="border py-1 px-1">Single</th>
              <th className="border py-1 px-1">Married</th>
              <th className="border py-1 px-1">Widowed</th>
              <th className="border py-1 px-1">Divorced</th>
              <th className="border py-1 px-1">Separated</th>
              <th className="border py-1 px-1">Annulled</th>
              <th className="border py-1 px-1">Live-in</th>
              <th className="border py-1 px-1">Unknown</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">15-17</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">18-24</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">25-30</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase">TOTAL</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ==================== PAGE BREAK ==================== */}
      <div className="print:block hidden" style={{ pageBreakAfter: 'always', height: 0 }} />

      {/* ==================== PAGE 2 ==================== */}

      {/* Extra top spacing above EDUCATION BACKGROUND (≈0.5 inch in print) */}
      <div className="hidden print:block" style={{ height: '0.5in' }} />

      {/* EDUCATION BACKGROUND */}
      <section className="mb-3 print:mb-5">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">EDUCATION BACKGROUND</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">EDUCATIONAL BACKGROUND</th>
              <th className="border py-1 px-1">15-17</th>
              <th className="border py-1 px-1">18-24</th>
              <th className="border py-1 px-1">25-30</th>
              <th className="border py-1 px-1">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border py-1 px-2 text-left">Elementary Level</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Elementary Grad</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">High School Level</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">High School Grad</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Vocational Grad</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">College Level</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">College Grad</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Master Level</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Master Grad</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Doctorate Level</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
            <tr><td className="border py-1 px-2 text-left">Doctorate Grad</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td></tr>
          </tbody>
        </table>
      </section>

      {/* YOUTH CLASSIFICATION */}
      <section className="mb-3 print:mb-5">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">YOUTH CLASSIFICATION</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2" rowSpan={2}>AGE GROUP</th>
              <th className="border py-1 px-1" colSpan={4}>CLASSIFICATION</th>
              <th className="border py-1 px-1" colSpan={3}>YOUTH WITH SPECIFIC NEEDS</th>
            </tr>
            <tr className="font-bold">
              <th className="border py-1 px-1">In-School</th>
              <th className="border py-1 px-1">Out-of-School</th>
              <th className="border py-1 px-1">Working</th>
              <th className="border py-1 px-1">Specific Needs</th>
              <th className="border py-1 px-1">PWD</th>
              <th className="border py-1 px-1">CICL</th>
              <th className="border py-1 px-1">IP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">15-17</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">18-24</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">25-30</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase">Total</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* WORK STATUS */}
      <section className="mb-4 print:mb-5">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">WORK STATUS</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">AGE GROUP</th>
              <th className="border py-1 px-1">Employed</th>
              <th className="border py-1 px-1">Unemployed</th>
              <th className="border py-1 px-1">Self-employed</th>
              <th className="border py-1 px-1">Looking for Job</th>
              <th className="border py-1 px-1">Not Interested</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">15-17</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">18-24</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left font-medium">25-30</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              <td className="border py-1">0</td><td className="border py-1">0</td><td className="border py-1">0</td>
              <td className="border py-1">0</td><td className="border py-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ==================== PAGE BREAK ==================== */}
      {/* <div className="print:block hidden" style={{ pageBreakAfter: 'always', height: 0 }} /> */}

      {/* ==================== PAGE 3 ==================== */}

      {/* top spacing */}
      {/* <div className="hidden print:block" style={{ height: '0.5in' }} /> */}

      {/* SIGNATURE */}
      <div className="mt-8 print:mt-5 text-left text-[10pt]">
        <p className="mb-4 italic text-[9.8pt]">
          I HEREBY CERTIFY that the information provided in this form is complete, true and correct to the best of my knowledge.
        </p>

        <div className="space-y-6 print:space-y-8">
          <div>
            <p className="mb-1">Prepared by:</p>
            <p className="border-t border-black w-64 inline-block">&nbsp;</p>
            <p className="font-bold text-[9.8pt]">Sk Secretary</p>
          </div>

          <div>
            <p className="mb-1">Noted by:</p>
            <p className="border-t border-black w-64 inline-block">&nbsp;</p>
            <p className="font-bold text-[9.8pt]">Sk Chairperson</p>
          </div>

          <div>
            <p className="mb-3">Received by:</p>
            <p className="font-medium uppercase border-b-1 border-black inline-block w-64">Maynard Erl John Tan Alvarez</p>
            <p className="font-bold text-[9.8pt]">Municipal Youth Development Officer</p>
          </div>
        </div>
      </div>

    </div>
  );
});

KKProfilePrint.displayName = 'KKProfilePrint';