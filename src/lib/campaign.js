const instantPattern=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
function validInstant(value){
 if(typeof value!=='string'||!instantPattern.test(value)||!Number.isFinite(Date.parse(value))) return false;
 const [year,month,day]=value.slice(0,10).split('-').map(Number);
 return month>=1&&month<=12&&day>=1&&day<=new Date(Date.UTC(year,month,0)).getUTCDate();
}
export function validateCampaign(config){
 if(!validInstant(config?.deadline)) throw new Error('Campaign deadline must be a valid timestamp with a timezone.');
 const url=new URL(config.donationUrl);if(url.protocol!=='https:')throw new Error('Donation URL must use HTTPS.');
 const p=config.progress;
 if(p?.enabled){
  if(!Number.isFinite(p.goal)||p.goal<=0||!Number.isFinite(p.current)||p.current<0||!['donors','USD'].includes(p.units)||!validInstant(p.updatedAt)) throw new Error('Verified progress needs goal, current, units and updatedAt.');
  if(!p.sourceUrl||new URL(p.sourceUrl).protocol!=='https:')throw new Error('Progress needs an HTTPS source.');
 }
 return config;
}
export function campaignState(config,nowEpochMs){
 validateCampaign(config);
 if(!Number.isFinite(nowEpochMs)) throw new Error('Current time must be finite.');
 const delta=Date.parse(config.deadline)-nowEpochMs;
 return {expired:delta<=0,remainingSeconds:Math.max(0,Math.ceil(delta/1000)),deadlineISO:config.deadline};
}
