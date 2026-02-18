import React from 'react';

export const KKProfilePrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="p-8 text-black bg-white font-arial leading-tight text-[11pt] print:p-6">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-6">
        <p className="text-[10pt] leading-tight">Republic of the Philippines</p>
        <p className="text-[10pt] leading-tight">Province of Northern Samar</p>
        <p className="text-[10pt] leading-tight">Municipality of Catarman</p>
        <p className="font-bold text-[11pt] mt-2 leading-tight">
          BARANGAY <span className="border-b border-black px-8">OLD RIZAL</span>
        </p>
        <p className="text-[10pt] mt-1">-oOo-</p>
        <p className="font-bold text-[12pt] mt-2 tracking-wide uppercase">
          Office of the Sangguniang Kabataan
        </p>
        <h2 className="font-bold text-[11pt] mt-4 uppercase underline decoration-1 underline-offset-2">
          Summary of Katipunan ng Kabataan Profile
        </h2>
        <p className="italic text-[10pt] mt-1">as of February 16, 2026</p>
      </div>

      {/* OVERVIEW SECTION */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Overview</h3>
        <table className="w-full border-collapse border border-black text-[11pt]">
          <tbody>
            <tr>
              <td className="border border-black px-3 py-2">Total No. of Purok/SK Members</td>
              <td className="border border-black px-3 py-2 text-center w-24">0</td>
            </tr>
            <tr>
              <td className="border border-black px-3 py-2">Total No. of Youths who Belong to the KK Profile</td>
              <td className="border border-black px-3 py-2 text-center w-24">0</td>
            </tr>
            <tr>
              <td className="border border-black px-3 py-2">Total No. of Out-of-School SK Members</td>
              <td className="border border-black px-3 py-2 text-center w-24">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black px-3 py-2 uppercase">Total</td>
              <td className="border border-black px-3 py-2 text-center">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* AGE GROUP AND SEX ASSIGNED AT BIRTH */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Age Group and Sex Assigned at Birth</h3>
        <table className="w-full border-collapse border border-black text-[11pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-2 px-3">SEX</th>
              <th className="border border-black py-2 px-3">15-17</th>
              <th className="border border-black py-2 px-3">18-24</th>
              <th className="border border-black py-2 px-3">25-30</th>
              <th className="border border-black py-2 px-3">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-2 px-3 text-left">Male</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-3 text-left">Female</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black py-2 px-3 uppercase">Total</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
              <td className="border border-black py-2 px-3">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* CHILD YOUTH */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Child Youth</h3>
        <table className="w-full border-collapse border border-black text-[11pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-2 px-2">SEX</th>
              <th className="border border-black py-2 px-2">15</th>
              <th className="border border-black py-2 px-2">16</th>
              <th className="border border-black py-2 px-2">17</th>
              <th className="border border-black py-2 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Male</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Female</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black py-2 px-2 uppercase">Total</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* CORE YOUTH */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Core Youth</h3>
        <table className="w-full border-collapse border border-black text-[8pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-1 px-1">SEX</th>
              <th className="border border-black py-1 px-1">18</th>
              <th className="border border-black py-1 px-1">19</th>
              <th className="border border-black py-1 px-1">20</th>
              <th className="border border-black py-1 px-1">21</th>
              <th className="border border-black py-1 px-1">22</th>
              <th className="border border-black py-1 px-1">23</th>
              <th className="border border-black py-1 px-1">24</th>
              <th className="border border-black py-1 px-1">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-1 px-1 text-left">Male</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left">Female</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black py-1 px-1 uppercase">Total</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* PAGE BREAK AFTER CORE YOUTH */}
      <div className="print:break-before-page"></div>

      {/* YOUNG ADULT */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Young Adult</h3>
        <table className="w-full border-collapse border border-black text-[8pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-1 px-1">SEX</th>
              <th className="border border-black py-1 px-1">25</th>
              <th className="border border-black py-1 px-1">26</th>
              <th className="border border-black py-1 px-1">27</th>
              <th className="border border-black py-1 px-1">28</th>
              <th className="border border-black py-1 px-1">29</th>
              <th className="border border-black py-1 px-1">30</th>
              <th className="border border-black py-1 px-1">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-1 px-1 text-left">Male</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left">Female</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black py-1 px-1 uppercase">Total</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* CIVIL STATUS */}
      <section className="mb-8">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Civil Status</h3>
        <table className="w-full border-collapse border border-black text-[8pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-1 px-1">AGE</th>
              <th className="border border-black py-1 px-1">Single</th>
              <th className="border border-black py-1 px-1">Married</th>
              <th className="border border-black py-1 px-1">Widowed</th>
              <th className="border border-black py-1 px-1">Divorced</th>
              <th className="border border-black py-1 px-1">Separated</th>
              <th className="border border-black py-1 px-1">Annulled</th>
              <th className="border border-black py-1 px-1">Live-in</th>
              <th className="border border-black py-1 px-1">Unknown</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">15-17</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">18-24</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">25-30</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black py-1 px-1 uppercase">Total</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* EDUCATION BACKGROUND */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Education Background</h3>
        <table className="w-full border-collapse border border-black text-[11pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-2 px-2">SEX</th>
              <th className="border border-black py-2 px-2">15-17</th>
              <th className="border border-black py-2 px-2">18-24</th>
              <th className="border border-black py-2 px-2">25-30</th>
              <th className="border border-black py-2 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Elementary Level</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Elementary Grad</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">High School Level</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">High School Grad</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Vocational Grad</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">College Level</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">College Grad</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Master Level</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Master Grad</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Doctorate Level</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
            <tr>
              <td className="border border-black py-2 px-2 text-left">Doctorate Grad</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
              <td className="border border-black py-2 px-2">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* PAGE BREAK AFTER EDUCATION BACKGROUND */}
      <div className="print:break-before-page"></div>

      {/* YOUTH CLASSIFICATION - ROTATED: AGE GROUPS AS ROWS */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Youth Classification</h3>
        <table className="w-full border-collapse border border-black text-[8pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-1 px-1" rowSpan="2">AGE GROUP</th>
              <th className="border border-black py-1 px-1" colSpan="4">CLASSIFICATION</th>
              <th className="border border-black py-1 px-1" colSpan="3">YOUTH WITH SPECIFIC NEEDS</th>
            </tr>
            <tr className="font-bold">
              <th className="border border-black py-1 px-1">In-School</th>
              <th className="border border-black py-1 px-1">Out-of-School</th>
              <th className="border border-black py-1 px-1">Working</th>
              <th className="border border-black py-1 px-1">Specific Needs</th>
              <th className="border border-black py-1 px-1">PWD</th>
              <th className="border border-black py-1 px-1">CICL</th>
              <th className="border border-black py-1 px-1">IP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">15-17</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">18-24</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">25-30</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black py-1 px-1 uppercase">Total</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* WORK STATUS - ROTATED: AGE GROUPS AS ROWS */}
      <section className="mb-5">
        <h3 className="font-bold text-[11pt] mb-2 uppercase">Work Status</h3>
        <table className="w-full border-collapse border border-black text-[8pt] text-center">
          <thead>
            <tr className="font-bold">
              <th className="border border-black py-1 px-1">AGE GROUP</th>
              <th className="border border-black py-1 px-1">Employed</th>
              <th className="border border-black py-1 px-1">Unemployed</th>
              <th className="border border-black py-1 px-1">Self-employed</th>
              <th className="border border-black py-1 px-1">Looking for Job</th>
              <th className="border border-black py-1 px-1">Not Interested</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">15-17</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">18-24</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr>
              <td className="border border-black py-1 px-1 text-left font-medium">25-30</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-black py-1 px-1 uppercase">Total</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
              <td className="border border-black py-1 px-1">0</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* SIGNATURE SECTION */}
      <div className="mt-16 text-[11pt]">
        <p className="mb-12 italic text-[10pt]">I HEREBY CERTIFY that the information provided in this form is complete, true and correct to the best of my knowledge.</p>

        <div className="space-y-6">
          <div>
            <p className="mb-6">Prepared by:</p>
            <div>
              <p className="pb-1 mb-1">&nbsp;</p>
              <p className="border-t border-black pt-1 w-80">
                <span className="font-bold uppercase text-[10pt]">SK SECRETARY</span>
              </p>
            </div>
          </div>
          
          <div>
            <p className="mb-6">Noted by:</p>
            <div>
              <p className="pb-1 mb-1">&nbsp;</p>
              <p className="border-t border-black pt-1 w-80">
                <span className="font-bold uppercase text-[10pt]">SK CHAIRPERSON</span>
              </p>
            </div>
          </div>
          
          <div>
            <p className="mb-6">Received by:</p>
            <div>
              <p className="pb-1 mb-1">Maynard Erl Jhon Tan Alvarez</p>
              <p className="border-t border-black pt-1 w-80">
                <span className="font-bold uppercase text-[10pt]">MUNICIPAL YOUTH DEVELOPMENT OFFICER</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

KKProfilePrint.displayName = 'KKProfilePrint';