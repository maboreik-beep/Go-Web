import React from 'react';
import { AdminWebsiteView, TextContent } from '../../types';
import { Button } from '../common/Button';

interface WebsiteListProps {
  websites: AdminWebsiteView[];
}

const getText = (value: TextContent): string => {
    if (typeof value === 'string') return value;
    if (!value) return '';
    return value.en || '';
};


const WebsiteList: React.FC<WebsiteListProps> = ({ websites }) => {

    const statusBadge = (isPublished: boolean) => {
        return isPublished 
            ? <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-green-600">Published</span>
            : <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-yellow-500">Draft</span>;
    }
    
    const handleViewSite = (site: AdminWebsiteView) => {
        alert(`This is a preview mode.\nIn a real app, this would open:\nhttps://goonline.cloud/${site.slug}`);
    }

    if (websites.length === 0) {
        return <p className="text-center text-gray-400 py-8">No websites created yet.</p>
    }

    return (
        <>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-dark-300 text-sm font-semibold text-light-300">
                            <th className="p-3">Site Name</th>
                            <th className="p-3">URL Slug</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3">Last Updated</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-300">
                        {websites.map((site) => (
                            <tr key={site.id} className="hover:bg-dark-100">
                                <td className="p-3">{getText(site.siteName)}</td>
                                <td className="p-3 font-mono text-sm">{site.slug || '-'}</td>
                                <td className="p-3 text-center">{statusBadge(site.isPublished || false)}</td>
                                <td className="p-3">{site.lastUpdated.toLocaleString()}</td>
                                <td className="p-3 text-center">
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => handleViewSite(site)} 
                                        className="py-1 px-3 text-sm"
                                        disabled={!site.isPublished || !site.slug}
                                        title={!site.isPublished ? "Site is not published" : "View Live Site"}
                                    >
                                        View Site
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {websites.map(site => (
                    <div key={site.id} className="bg-dark-100 p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-light-100">{getText(site.siteName)}</p>
                                <p className="text-sm text-light-300 font-mono">{site.slug || 'no-slug'}</p>
                                <p className="text-xs text-gray-400 mt-1">{site.lastUpdated.toLocaleString()}</p>
                            </div>
                            {statusBadge(site.isPublished || false)}
                        </div>
                        <div className="text-right mt-4">
                             <Button 
                                variant="ghost" 
                                onClick={() => handleViewSite(site)}
                                className="py-1 px-3 text-sm"
                                disabled={!site.isPublished || !site.slug}
                            >
                                View Site
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default WebsiteList;
