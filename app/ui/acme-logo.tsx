import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ReactElement } from 'react';

import { lusitana } from '@/app/ui/fonts';

const AcmeLogo = (): ReactElement => (
  <div
    className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
  >
    <GlobeAltIcon className="h-12 w-12 rotate-[15deg]"/>
    <p className="text-[44px]">Acme</p>
  </div>
);

export { AcmeLogo };
