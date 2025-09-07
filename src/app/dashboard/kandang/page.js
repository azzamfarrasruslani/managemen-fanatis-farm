'use client';

import { useEffect, useState } from 'react';
import {
  FaDrumstickBite,
  FaWarehouse,
  FaCheckCircle,
  FaEgg
} from 'react-icons/fa';
import { supabase } from '@/lib/supabaseClient';
import KandangHeader from './components/KandangHeader';
import StatCard from './components/StatCard';
import KandangCard from './components/KandangCard';
import KandangFormModal from './components/KandangFormModal';

export default function KandangPage() {
  const [kandangList, setKandangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchKandang = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('kandang').select('*').order('id', { ascending: true });
    if (error) console.log(error);
    else setKandangList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchKandang();
  }, []);

  const totalKandang = kandangList.length;
  const totalBebek = kandangList.reduce((acc, curr) => acc + curr.jumlah_bebek, 0);
  const aktifKandang = kandangList.filter(k => k.status === 'Aktif').length;
  const kandangBertelur = kandangList.filter(k => k.status_telur === 'Bertelur').length;

  const handleEdit = (kandang) => {
    setEditData(kandang);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah yakin ingin menghapus data ini?")) {
      const { error } = await supabase.from('kandang').delete().eq('id', id);
      if (error) console.log(error);
      else fetchKandang();
    }
  };

  return (
    <div className="space-y-8">
      <KandangHeader onTambah={() => { setEditData(null); setModalOpen(true); }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Kandang" value={totalKandang} icon={<FaWarehouse />} color="green" />
        <StatCard title="Jumlah Bebek" value={`${totalBebek} Ekor`} icon={<FaDrumstickBite />} color="lime" />
        <StatCard title="Kandang Aktif" value={`${aktifKandang} Kandang`} icon={<FaCheckCircle />} color="emerald" />
        <StatCard title="Kandang Bertelur" value={`${kandangBertelur} Kandang`} icon={<FaEgg />} color="yellow" />
      </div>

      {loading ? <p>Loading...</p> :
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {kandangList.map((kandang) => (
            <KandangCard
              key={kandang.id}
              kandang={kandang}
              onEdit={() => handleEdit(kandang)}
              onDelete={() => handleDelete(kandang.id)}
            />
          ))}
        </div>
      }

      {modalOpen && (
        <KandangFormModal
          closeModal={() => setModalOpen(false)}
          editData={editData}
          refreshData={fetchKandang}
        />
      )}
    </div>
  );
}
