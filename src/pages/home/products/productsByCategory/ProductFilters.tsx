// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const ProductFilters = ({ filters, selectedSpecs, onToggle }) => {
//   return (
//     <div className="p-4 bg-[var(--color-gray)] rounded-xl w-1/4">
//       <h2 className="text-xl font-semibold mb-3">Filter By Specifications</h2>
//       {/* [specName, values] => array destructuring. Same as: (entry)=>{
//       const specName=entry[0]
//       const values = entry[1]} */}
//       {Object.entries(filters).map(([specName, values]) => (
//         <div key={specName} className="mb-4">
//           <h3 className="font-bold mb-1">{specName}</h3>
//           {values.map((value) => (
//             <Label key={value} className="block text-sm mb-1">
//               <Input
//                 type="checkbox"
//                 checked={selectedSpecs[specName]?.includes(value) || false}
//                 onChange={() => onToggle(specName, value)}
//               />
//               {value}
//             </Label>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductFilters;
