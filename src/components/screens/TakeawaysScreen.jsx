import { useState } from 'react';
import TwoPane from '../TwoPane.jsx';

export default function TakeawaysScreen({ step }) {
  const [skill, setSkill] = useState('');
  const [support, setSupport] = useState('');
  return (
    <TwoPane step={step} label="Workspace">
      <h3 className="rp-title">Plan your next use</h3>
      <p>Think of an upcoming assignment. Decide what you’ll practice and where AI could help.</p>
      <label className="field"><span>The skill I’ll practice</span>
        <textarea rows={3} value={skill} placeholder="I’ll do this part myself…" onChange={(e) => setSkill(e.target.value)} /></label>
      <label className="field"><span>The support I’ll ask for</span>
        <textarea rows={3} value={support} placeholder="I’ll ask AI to act as…" onChange={(e) => setSupport(e.target.value)} /></label>
    </TwoPane>
  );
}
