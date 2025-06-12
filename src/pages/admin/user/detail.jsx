import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Building, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toCapitalize } from "@/lib/utils";
import useCrud from "@/hooks/useCrud";

export default function DetailUserPage() {
  const { id } = useParams();
  const { getData, detailLoading, error } = useCrud("/users", {
    autoFetch: false,
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (id) {
      getData(id).then(setUserData).catch(console.error);
    }
  }, [id, getData]);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "POLSEK":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "ADMIN":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "USER":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleSendEmail = () => {
    if (userData?.email) {
      window.location.href = `mailto:${userData.email}`;
    }
  };

  if (detailLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!userData) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Detail Pengguna</h1>
          <p className="text-muted-foreground">
            Informasi lengkap pengguna sistem
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="lg:col-span-2">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informasi Profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                  <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                    {toCapitalize(userData.name).charAt(0)}
                    {toCapitalize(userData.name).split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-muted-foreground">{userData.email}</p>
                  <Badge className={`mt-2 ${getRoleBadgeColor(userData.role)}`}>
                    {userData.role}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      ID Pengguna
                    </label>
                    <p className="text-sm font-mono bg-muted-foreground/20 p-2 rounded border">
                      {userData.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Nama Lengkap
                    </label>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Role
                    </label>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <p>{userData.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Information */}
        <div className="space-y-6">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Unit Kerja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Polsek
                  </label>
                  <p className="font-medium">{userData.polsek?.name || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleSendEmail}
              >
                <Mail className="h-4 w-4 mr-2" />
                Kirim Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Reset Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
