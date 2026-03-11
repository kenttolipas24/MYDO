import React from 'react';

export const KKProfilePrint = React.forwardRef(({ stats }, ref) => {
  if (!stats) return null;

  return (
    <div
      ref={ref}
      className="
        bg-white text-black font-arial leading-tight text-[10.5pt]
        print:text-[10pt] print:leading-tight
        print:m-[0.75in_0.5in_0.75in_0.5in]
      "
    >
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
        <p className="italic text-[9.5pt] mt-1">
          as of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* OVERVIEW */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">OVERVIEW</h3>
        <table className="w-full border-collapse border border-black text-[10pt]">
          <tbody>
            <tr>
              <td className="border px-2 py-1">Total No. of Purok/SK Members</td>
              <td className="border px-2 py-1 text-center w-24">0</td> {/* Update if you track this separately */}
            </tr>
            <tr>
              <td className="border px-2 py-1">Total No. of Youths who Belong to the KK Profile</td>
              <td className="border px-2 py-1 text-center w-24 font-bold">{stats.totalYouth}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Total No. of Out-of-School SK Members</td>
              <td className="border px-2 py-1 text-center w-24">{stats.classification.totals.outOfSchool}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* AGE GROUP AND SEX */}
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
            <tr><td className="border py-1 px-2 text-left">Male</td><td className="border py-1">{stats.ageSex.male['15-17']}</td><td className="border py-1">{stats.ageSex.male['18-24']}</td><td className="border py-1">{stats.ageSex.male['25-30']}</td><td className="border py-1 font-bold">{stats.ageSex.male.total}</td></tr>
            <tr><td className="border py-1 px-2 text-left">Female</td><td className="border py-1">{stats.ageSex.female['15-17']}</td><td className="border py-1">{stats.ageSex.female['18-24']}</td><td className="border py-1">{stats.ageSex.female['25-30']}</td><td className="border py-1 font-bold">{stats.ageSex.female.total}</td></tr>
            <tr className="font-bold"><td className="border py-1 px-2 uppercase text-left">TOTAL</td><td className="border py-1">{stats.ageSex.totals['15-17']}</td><td className="border py-1">{stats.ageSex.totals['18-24']}</td><td className="border py-1">{stats.ageSex.totals['25-30']}</td><td className="border py-1">{stats.ageSex.totals.grand}</td></tr>
          </tbody>
        </table>
      </section>

      {/* CHILD YOUTH (15-17) */}
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
            <tr><td className="border py-1 px-2 text-left">Male</td><td className="border py-1">{stats.childYouth.male[15]}</td><td className="border py-1">{stats.childYouth.male[16]}</td><td className="border py-1">{stats.childYouth.male[17]}</td><td className="border py-1 font-bold">{stats.childYouth.male.total}</td></tr>
            <tr><td className="border py-1 px-2 text-left">Female</td><td className="border py-1">{stats.childYouth.female[15]}</td><td className="border py-1">{stats.childYouth.female[16]}</td><td className="border py-1">{stats.childYouth.female[17]}</td><td className="border py-1 font-bold">{stats.childYouth.female.total}</td></tr>
            <tr className="font-bold"><td className="border py-1 px-2 uppercase text-left">TOTAL</td><td className="border py-1">{stats.childYouth.totals[15]}</td><td className="border py-1">{stats.childYouth.totals[16]}</td><td className="border py-1">{stats.childYouth.totals[17]}</td><td className="border py-1">{stats.childYouth.totals.grand}</td></tr>
          </tbody>
        </table>
      </section>

      {/* CORE YOUTH (18-24) */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">CORE YOUTH</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">SEX</th>
              {[18, 19, 20, 21, 22, 23, 24].map(a => <th key={a} className="border py-1 px-1">{a}</th>)}
              <th className="border py-1 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 px-2 text-left">Male</td>
              {[18, 19, 20, 21, 22, 23, 24].map(a => <td key={a} className="border py-1">{stats.coreYouth.male[a]}</td>)}
              <td className="border py-1 font-bold">{stats.coreYouth.male.total}</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left">Female</td>
              {[18, 19, 20, 21, 22, 23, 24].map(a => <td key={a} className="border py-1">{stats.coreYouth.female[a]}</td>)}
              <td className="border py-1 font-bold">{stats.coreYouth.female.total}</td>
            </tr>
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              {[18, 19, 20, 21, 22, 23, 24].map(a => <td key={a} className="border py-1">{stats.coreYouth.totals[a]}</td>)}
              <td className="border py-1">{stats.coreYouth.totals.grand}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* YOUNG ADULT (25-30) */}
      <section className="mb-3 print:mb-2">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">YOUNG ADULT</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">SEX</th>
              {[25, 26, 27, 28, 29, 30].map(a => <th key={a} className="border py-1 px-1">{a}</th>)}
              <th className="border py-1 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border py-1 px-2 text-left">Male</td>
              {[25, 26, 27, 28, 29, 30].map(a => <td key={a} className="border py-1">{stats.youngAdult.male[a]}</td>)}
              <td className="border py-1 font-bold">{stats.youngAdult.male.total}</td>
            </tr>
            <tr>
              <td className="border py-1 px-2 text-left">Female</td>
              {[25, 26, 27, 28, 29, 30].map(a => <td key={a} className="border py-1">{stats.youngAdult.female[a]}</td>)}
              <td className="border py-1 font-bold">{stats.youngAdult.female.total}</td>
            </tr>
            <tr className="font-bold bg-gray-50/50 print:bg-transparent">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              {[25, 26, 27, 28, 29, 30].map(a => <td key={a} className="border py-1">{stats.youngAdult.totals[a]}</td>)}
              <td className="border py-1">{stats.youngAdult.totals.grand}</td>
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
              <th className="border py-1 px-1">Single</th><th className="border py-1 px-1">Married</th>
              <th className="border py-1 px-1">Widowed</th><th className="border py-1 px-1">Divorced</th>
              <th className="border py-1 px-1">Separated</th><th className="border py-1 px-1">Annulled</th>
              <th className="border py-1 px-1">Live-in</th><th className="border py-1 px-1">Unknown</th>
            </tr>
          </thead>
          <tbody>
            {['15-17', '18-24', '25-30'].map(age => (
              <tr key={age}>
                <td className="border py-1 px-2 text-left font-medium">{age}</td>
                <td className="border py-1">{stats.civilStatus[age].single}</td><td className="border py-1">{stats.civilStatus[age].married}</td>
                <td className="border py-1">{stats.civilStatus[age].widowed}</td><td className="border py-1">{stats.civilStatus[age].divorced}</td>
                <td className="border py-1">{stats.civilStatus[age].separated}</td><td className="border py-1">{stats.civilStatus[age].annulled}</td>
                <td className="border py-1">{stats.civilStatus[age].liveIn}</td><td className="border py-1">{stats.civilStatus[age].unknown}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              <td className="border py-1">{stats.civilStatus.totals.single}</td><td className="border py-1">{stats.civilStatus.totals.married}</td>
              <td className="border py-1">{stats.civilStatus.totals.widowed}</td><td className="border py-1">{stats.civilStatus.totals.divorced}</td>
              <td className="border py-1">{stats.civilStatus.totals.separated}</td><td className="border py-1">{stats.civilStatus.totals.annulled}</td>
              <td className="border py-1">{stats.civilStatus.totals.liveIn}</td><td className="border py-1">{stats.civilStatus.totals.unknown}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* PAGE BREAK */}
      <div className="print:block hidden" style={{ pageBreakAfter: 'always', height: 0 }} />
      <div className="hidden print:block" style={{ height: '0.5in' }} />

      {/* EDUCATION BACKGROUND */}
      <section className="mb-3 print:mb-5">
        <h3 className="font-bold text-[10pt] mb-1 uppercase">EDUCATION BACKGROUND</h3>
        <table className="w-full border-collapse border border-black text-[9.5pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border py-1 px-2 text-left">EDUCATIONAL BACKGROUND</th>
              <th className="border py-1 px-1">15-17</th><th className="border py-1 px-1">18-24</th>
              <th className="border py-1 px-1">25-30</th><th className="border py-1 px-1">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {[
              { k: 'elemLevel', label: 'Elementary Level' }, { k: 'elemGrad', label: 'Elementary Grad' },
              { k: 'hsLevel', label: 'High School Level' }, { k: 'hsGrad', label: 'High School Grad' },
              { k: 'vocGrad', label: 'Vocational Grad' },
              { k: 'colLevel', label: 'College Level' }, { k: 'colGrad', label: 'College Grad' },
              { k: 'masterLevel', label: 'Master Level' }, { k: 'masterGrad', label: 'Master Grad' },
              { k: 'docLevel', label: 'Doctorate Level' }, { k: 'docGrad', label: 'Doctorate Grad' }
            ].map(edu => (
              <tr key={edu.k}>
                <td className="border py-1 px-2 text-left">{edu.label}</td>
                <td className="border py-1">{stats.education[edu.k]['15-17']}</td>
                <td className="border py-1">{stats.education[edu.k]['18-24']}</td>
                <td className="border py-1">{stats.education[edu.k]['25-30']}</td>
                <td className="border py-1 font-bold">{stats.education[edu.k].total}</td>
              </tr>
            ))}
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
              <th className="border py-1 px-1" colSpan={3}>SPECIFIC NEEDS</th>
            </tr>
            <tr className="font-bold">
              <th className="border py-1 px-1">In-School</th><th className="border py-1 px-1">Out-of-School</th>
              <th className="border py-1 px-1">Working</th><th className="border py-1 px-1">Specific Needs</th>
              <th className="border py-1 px-1">PWD</th><th className="border py-1 px-1">CICL</th><th className="border py-1 px-1">IP</th>
            </tr>
          </thead>
          <tbody>
            {['15-17', '18-24', '25-30'].map(age => (
              <tr key={age}>
                <td className="border py-1 px-2 text-left font-medium">{age}</td>
                <td className="border py-1">{stats.classification[age].inSchool}</td><td className="border py-1">{stats.classification[age].outOfSchool}</td>
                <td className="border py-1">{stats.classification[age].working}</td><td className="border py-1">{stats.classification[age].specificNeeds}</td>
                <td className="border py-1">{stats.classification[age].pwd}</td><td className="border py-1">{stats.classification[age].cicl}</td><td className="border py-1">{stats.classification[age].ip}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              <td className="border py-1">{stats.classification.totals.inSchool}</td><td className="border py-1">{stats.classification.totals.outOfSchool}</td>
              <td className="border py-1">{stats.classification.totals.working}</td><td className="border py-1">{stats.classification.totals.specificNeeds}</td>
              <td className="border py-1">{stats.classification.totals.pwd}</td><td className="border py-1">{stats.classification.totals.cicl}</td><td className="border py-1">{stats.classification.totals.ip}</td>
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
              <th className="border py-1 px-1">Employed</th><th className="border py-1 px-1">Unemployed</th>
              <th className="border py-1 px-1">Self-employed</th><th className="border py-1 px-1">Looking for Job</th>
              <th className="border py-1 px-1">Not Interested</th>
            </tr>
          </thead>
          <tbody>
            {['15-17', '18-24', '25-30'].map(age => (
              <tr key={age}>
                <td className="border py-1 px-2 text-left font-medium">{age}</td>
                <td className="border py-1">{stats.workStatus[age].employed}</td><td className="border py-1">{stats.workStatus[age].unemployed}</td>
                <td className="border py-1">{stats.workStatus[age].selfEmployed}</td><td className="border py-1">{stats.workStatus[age].looking}</td>
                <td className="border py-1">{stats.workStatus[age].notInterested}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="border py-1 px-2 uppercase text-left">TOTAL</td>
              <td className="border py-1">{stats.workStatus.totals.employed}</td><td className="border py-1">{stats.workStatus.totals.unemployed}</td>
              <td className="border py-1">{stats.workStatus.totals.selfEmployed}</td><td className="border py-1">{stats.workStatus.totals.looking}</td>
              <td className="border py-1">{stats.workStatus.totals.notInterested}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* SIGNATURE */}
      <div className="mt-8 print:mt-5 text-left text-[10pt] print:break-inside-avoid">
        <p className="mb-4 italic text-[9.8pt]">
          I HEREBY CERTIFY that the information provided in this form is complete, true and correct to the best of my knowledge.
        </p>

        <div className="space-y-6 print:space-y-8">
          <div>
            <p className="mb-1">Prepared by:</p>
            <p className="border-t border-black w-64 inline-block">&nbsp;</p>
            <p className="font-bold text-[9.8pt]">SK Secretary</p>
          </div>
          <div>
            <p className="mb-1">Noted by:</p>
            <p className="border-t border-black w-64 inline-block">&nbsp;</p>
            <p className="font-bold text-[9.8pt]">SK Chairperson</p>
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