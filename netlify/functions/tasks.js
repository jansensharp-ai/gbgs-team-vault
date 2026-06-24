import { getStore } from '@netlify/blobs';

const DEFAULT_TASKS = [
  { task: 'Highlight Reel Guide',                                       who: 'Colton',                    rc: false, fr: false, gb: false },
  { task: 'NPS Guide',                                                   who: 'Reece & Sam',               rc: false, fr: false, gb: false },
  { task: 'All Team Meeting Slideshow Template',                         who: 'Colton',                    rc: false, fr: false, gb: false },
  { task: 'GEL Team Meeting Slideshow Template',                         who: 'Colton',                    rc: false, fr: false, gb: false },
  { task: 'Management Meeting Notes Template',                           who: 'JD',                        rc: false, fr: false, gb: false },
  { task: 'Standardized Studio Opening Procedures',                      who: 'Colton & Kevin',            rc: false, fr: false, gb: false },
  { task: 'Standardized Studio Closing Procedures',                      who: 'Colton & Kevin',            rc: false, fr: false, gb: false },
  { task: 'Standardized GEL Closing Procedures',                        who: 'Colton',                    rc: false, fr: false, gb: false },
  { task: 'Standardized GEL Opening Procedures',                        who: 'Colton',                    rc: false, fr: false, gb: false },
  { task: 'Best Practices for Anniversary Planning',                     who: 'Sam',                       rc: false, fr: false, gb: false },
  { task: 'Best Practices for Team Event Planning',                      who: 'Sam',                       rc: false, fr: false, gb: false },
  { task: 'Train the Trainer',                                           who: 'Reece',                     rc: true,  fr: false, gb: false },
  { task: 'Host Training Process',                                       who: 'Reece',                     rc: true,  fr: false, gb: false },
  { task: 'Re-Visit Launch Training Plan',                               who: 'Reece',                     rc: true,  fr: false, gb: false },
  { task: 'Re-Visit New Hire Training Plan',                             who: 'Reece',                     rc: true,  fr: false, gb: false },
  { task: 'Navigate Zendesk Guide',                                      who: 'Sam & Kevin',               rc: false, fr: false, gb: false },
  { task: 'How to Submit a Ticket Guide',                                who: 'Sam & Kevin',               rc: false, fr: false, gb: false },
  { task: 'Navigate chIPpy Data Dashboard Guide',                        who: 'Sam & Kevin',               rc: false, fr: false, gb: false },
  { task: "Service Failure Sign-Off for AMit's",                         who: 'JD',                        rc: false, fr: false, gb: false },
  { task: "ADAPT Sign-Off for AMit's",                                   who: 'JD',                        rc: false, fr: false, gb: false },
  { task: "Tool Knowledge Test for AMit's",                              who: 'Sam & Kevin',               rc: false, fr: false, gb: false },
  { task: 'Launch Tasklist',                                             who: 'Jansen',                    rc: false, fr: false, gb: false },
  { task: 'Store Launch Non-Negotiables / Sign-Off for Launch Leads',   who: 'JD',                        rc: false, fr: false, gb: false },
  { task: 'Management Training Passport',                                who: 'Zone Leaders',              rc: false, fr: false, gb: false },
  { task: 'Ascend — Setting the Table',                                  who: 'JD',                        rc: false, fr: false, gb: false },
  { task: 'GMit Course Development',                                     who: 'Sam',                       rc: false, fr: false, gb: false },
  { task: 'Staffing Cost Tool',                                          who: 'Jansen',                    rc: false, fr: false, gb: false },
  { task: 'Decked Out in Culture',                                       who: 'Sam & Reece & Laura / Keith', rc: false, fr: false, gb: false },
  { task: 'Colored Polo Comms / Rollout / Clarity',                     who: 'Zone Leaders',              rc: false, fr: false, gb: false },
  { task: 'Update Uniform Guidelines',                                   who: 'Zone Leaders',              rc: false, fr: false, gb: false },
  { task: 'Selection Strategy Rewrite for GBGS',                        who: 'Sam & Jansen & Reece',      rc: false, fr: false, gb: false },
  { task: 'Souvenir Showdown at Opry Testing',                          who: 'Jansen',                    rc: false, fr: false, gb: false },
  { task: 'BSB Revamp',                                                  who: 'Zone Leaders',              rc: false, fr: false, gb: false },
];

export default async (req) => {
  const store = getStore('vault');

  if (req.method === 'GET') {
    const data = await store.get('tasks', { type: 'json' }).catch(() => null);
    return Response.json(data ?? DEFAULT_TASKS);
  }

  if (req.method === 'PUT') {
    const body = await req.json();
    if (!Array.isArray(body)) return new Response('Bad request', { status: 400 });
    await store.set('tasks', JSON.stringify(body));
    return Response.json({ ok: true });
  }

  return new Response('Method not allowed', { status: 405 });
};

export const config = { path: '/api/tasks' };
