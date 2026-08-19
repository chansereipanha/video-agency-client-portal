import { clients } from "@/lib/clients";
import ResourceGrid from "@/components/ResourceGrid";
export default function LibraryPage() {
    const client = clients[0];
    return (
        <section className="page">
            <div className="page-title">
                <div>
                    <p className="eyebrow">ASSET MANAGEMENT</p>
                    <h1>Content library</h1>
                    <p>Search, review and share your production work.</p>
                </div>
                <button className="button">↑ Upload files</button>
            </div>
            <div className="library">
                <aside className="card filter-panel">
                <div>
                    All resources <span>64</span>
                </div>
                <div>
                    Videos <span>32</span>
                </div>
                <div>
                    Photos <span>24</span>
                </div>
                <div>
                    Documents <span>8</span>
                </div>
                </aside>
                <section className="card">
                    <div className="card-head">
                        <div>
                            <h2>All resources</h2>
                            <small>Recent items for {client.name}</small>
                        </div>
                        <span className="label">NEWEST FIRST</span>
                    </div>
                    <ResourceGrid clientName={client.name} />
                </section>
            </div>
        </section>
    );
}
