import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import logo from "../assets/StructureAssets/EcommerceLogo.png"

const Navbar = () => {
    const { authClient, logout } = useAuthStore()
    return (
        <header className="bg-base-100 fixed w-full top-0">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-12 rounded-lg flex items-center justify-center">
                                <img src={logo} alt="CompanyLogo" />
                            </div>
                            <h1 className="text-lg font-bold">ShopSphere</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors`}>
                            <Settings className="w-4 h-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>

                        {authClient ? (
                            <>
                                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                <button className="flex gap-2 items-center" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"} className={`btn btn-sm gap-2`}>
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>
                                
                                <Link to={"/signupUser"} className={`btn btn-sm gap-2`}>
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">SignUp</span>
                                </Link>

                                <Link to={"/signupSeller"} className={`btn btn-sm gap-2`}>
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">SignUpSeller</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Navbar