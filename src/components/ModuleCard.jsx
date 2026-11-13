import { Link } from 'react-router-dom';

export default function ModuleCard({ module }) {
  return (
    <Link className="card" to={`/module/${module.slug}`}>
      <span className="icon" aria-hidden="true">{module.icon}</span>
      <h3>{module.title}</h3>
    </Link>
  );
}
